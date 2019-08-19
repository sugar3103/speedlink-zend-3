<?php
namespace PricingSpecial\Controller;

set_time_limit(300);

use Address\Entity\City;
use Address\Entity\District;
use Address\Entity\Ward;
use Core\Controller\CoreController;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PricingSpecial\Entity\SpecialArea;
use PricingSpecial\Entity\SpecialZone;
use PricingSpecial\Form\ZoneForm;
use PricingSpecial\Service\SpecialZoneManager;
use Zend\Cache\Storage\StorageInterface;

class SpecialZoneController extends CoreController
{
    /**
     * EntityManager.
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * Customer Manager.
     * @var SpecialZoneManager
     */
    protected $specialZoneManager;

    /**
     * @var StorageInterface
     */
    protected $cache;

    /**
     * CustomerController constructor.
     * @param $entityManager
     * @param $specialZoneManager
     */

    public function __construct($entityManager, $specialZoneManager, $cache)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->specialZoneManager = $specialZoneManager;
        $this->cache = $cache;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost()) {
            // get the filters
            $fieldsMap = [
                0 => 'id',
                1 => 'name',
                2 => 'name_en',
                3 => 'created_at',
                4 => 'customer_id',
                5 => 'special_area_id',
                6 => 'from_city',
                7 => 'to_city',
                8 => 'to_district',
                9 => 'to_ward',
            ];

            list($start, $limit, $sortField, $sortDirection, $filters, $fields) = $this->getRequestData($fieldsMap);
            //get list User by condition
            $dataZone = $this->specialZoneManager->getListSpecialZoneByCondition($start, $limit, $sortField, $sortDirection, $filters);

            $result = $this->filterByField($dataZone['listZone'], $fields);

            $this->apiResponse = array(
                'data' => $result,
                'total' => $dataZone['totalZone'],
            );
        }
        return $this->createResponse();
    }

    public function addAction()
    {
        // check if Special Zone  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;

            //Create New Form Special Zone
            $form = new ZoneForm('create', $this->entityManager);

            $form->setData($this->getRequestData());

            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                if ($this->entityManager->getRepository(SpecialZone::class)->checkExitWithAddress($data)) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "SPECIAL_ZONE_HAD_BEEN_EXISTED";
                } else {
                    // add Special Zone.
                    $this->specialZoneManager->addZone($data, $user);
                    $this->apiResponse['message'] = "ADD_SUCCESS_SPECIAL_ZONE";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "Error";
                $this->apiResponse['data'] = $form->getMessages();
            }
        }

        return $this->createResponse();
    }

    public function editAction()
    {
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;
            $data = $this->getRequestData();
            if (isset($data['id'])) {
                // Find existing Special Zone in the database.
                $area = $this->entityManager->getRepository(SpecialZone::class)->findOneBy(array('id' => $data['id']));
                if ($area) {
                    //Create Form Zone
                    $form = new ZoneForm('update', $this->entityManager, $area);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        $preData = $this->entityManager->getRepository(SpecialZone::class)->checkExitWithAddress($data);
                        if ($preData[0]['id'] != $area->getId()) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "SPECIAL_ZONE_HAD_BEEN_EXISTED";
                        } else {
                            // update Special Zone.
                            $this->specialZoneManager->updateZone($area, $data, $user);
                            $this->apiResponse['message'] = "MODIFIED_SUCCESS_SPECIAL_ZONE";
                        }

                    } else {
                        $this->error_code = 0;
                        $this->apiResponse['data'] = $form->getMessages();
                    }
                } else {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "NOT_FOUND";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_ZONE_REQUEST_ID";
            }
        }

        return $this->createResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->getRequestData();
            $user = $this->tokenPayload;
            if (isset($data['ids']) && count($data['ids']) > 0) {

                try {
                    foreach ($data['ids'] as $id) {
                        $zone = $this->entityManager->getRepository(SpecialZone::class)->findOneBy(array('id' => $id));
                        if ($zone == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";
                        } else {
                            $this->specialZoneManager->deleteZone($zone, $user);
                            $this->apiResponse['message'] = "DELETE_SUCCESS_SPECIAL_ZONE";
                        }
                    }

                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "SPECIAL_ZONE_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_ZONE_REQUEST_ID";
            }
        }
        return $this->createResponse();
    }

    public function importAction()
    {
        $files = $this->params()->fromFiles('import_file');
        $this->apiResponse = array(
            'data' => $files,
        );

        return $this->createResponse();

        $nameField = [
            0 => 'name',
            1 => 'name_en',
            2 => 'from_city',
            3 => 'to_city',
            4 => 'to_district',
            5 => 'to_ward',
            6 => 'account_no',
            7 => 'area_name',
        ];
        //Tạo mảng chứa dữ liệu
        // $this->cache->removeItem('specialZone');die;
        $start = 0;
        $lenght = 1000;
        $data = [];

        if ($this->getRequest()->isPost()) {
            // $file = __DIR__ . "/data.xlsx";
            $file = $this->params()->fromFiles('import_file');
            $dataPost = $this->getRequestData();
            $offset = isset($dataPost['offset']) ? $dataPost['offset'] : 0;
            if ($offset) {
                $lenght = isset($offset['limit']) ? $offset['limit'] : 1000;
                $start = isset($offset['start']) ? ($lenght * ($offset['start'] - 1)) : 0;
            }

            $data = $this->cache->getItem('specialZone', $result);

            if (!$result) {
                $objFile = IOFactory::identify($file);
                $objData = IOFactory::createReader($objFile);
                $objData->setReadDataOnly(true);
                // Load dữ liệu sang dạng đối tượng
                $objPHPExcel = $objData->load($file);

                //Chọn trang cần truy xuất
                $sheet = $objPHPExcel->setActiveSheetIndex(0);

                //Lấy ra số dòng cuối cùng
                $Totalrow = $sheet->getHighestRow();
                //Lấy ra tên cột cuối cùng
                $LastColumn = $sheet->getHighestColumn();

                //Chuyển đổi tên cột đó về vị trí thứ, VD: C là 3,D là 4
                $TotalCol = Coordinate::columnIndexFromString($LastColumn);

                //Tiến hành lặp qua từng ô dữ liệu
                //----Lặp dòng, Vì dòng đầu là tiêu đề cột nên chúng ta sẽ lặp giá trị từ dòng 2
                for ($i = 1; $i <= $Totalrow; $i++) {
                    //----Lặp cột
                    for ($j = 1; $j <= $TotalCol; $j++) {
                        // Tiến hành lấy giá trị của từng ô đổ vào mảng
                        $data[$i - 1][$nameField[$j - 1]] = $sheet->getCellByColumnAndRow($j, $i)->getValue();
                    }
                }

                // Save Data to cache.
                $this->cache->setItem('specialZone', $data);
            } else {
                $LastColumn = count($data);
            }

            $dataResult = array_slice($data, $start, $lenght);

            $customers = [];
            $area = [];
            $fromCity = [];
            $toCity = [];
            $toDistrict = [];
            $toWard = [];

            for ($i = 0; $i < count($dataResult); $i++) {
                if (!in_array($dataResult[$i]['account_no'], $customers)) {
                    $customers[] = $data[$i]['account_no'];
                }

                if (!in_array($dataResult[$i]['area_name'], $area)) {
                    $area[] = $dataResult[$i]['area_name'];
                }

                if (!in_array($dataResult[$i]['from_city'], $fromCity)) {
                    $fromCity[] = $data[$i]['from_city'];
                }

                if (!in_array($dataResult[$i]['to_city'], $toCity)) {
                    $toCity[] = $dataResult[$i]['to_city'];
                }

                if (!in_array($dataResult[$i]['to_district'], $toDistrict)) {
                    $toDistrict[] = $dataResult[$i]['to_district'];
                }

                if (!in_array($dataResult[$i]['to_ward'], $toWard)) {
                    $toWard[] = $dataResult[$i]['to_ward'];
                }
            }

            //Get Custom
            $customers = $this->entityManager->getRepository(Customer::class)->findBy([
                'customer_no' => $customers,
            ]);

            $areas = $this->entityManager->getRepository(SpecialArea::class)->findBy([
                'name' => $area,
                'is_deleted' => 0,
            ]);

            $fromCity = $this->entityManager->getRepository(City::class)->findBy([
                'name' => $fromCity,
                'is_deleted' => 0,
            ]);
            $toCity = $this->entityManager->getRepository(City::class)->findBy([
                'name' => $toCity,
                'is_deleted' => 0,
            ]);

            $toDistrict = $this->entityManager->getRepository(District::class)->findBy([
                'name' => $toDistrict,
                'is_deleted' => 0,
            ]);
            $toWard = $this->entityManager->getRepository(Ward::class)->findBy([
                'name' => $toWard,
                'is_deleted' => 0,
            ]);

            for ($i = 0; $i < count($dataResult); $i++) {
                $error = false;
                $value = $dataResult[$i];
                $value['id'] = $i + $start;
                $error = array(
                    'customer' => 'SPECIAL_IMPORT_CUSTOMER_NOT_EXIT',
                    'area' => 'SPECIAL_IMPORT_AREA_NOT_EXIT',
                    'fromCity' => 'SPECIAL_IMPORT_FROM_CITY_NOT_EXIT',
                    'toCity' => 'SPECIAL_IMPORT_TO_CITY_NOT_EXIT',
                    'toDistrict' => 'SPECIAL_IMPORT_TO_DISTRICT_NOT_EXIT',
                    'toWard' => 'SPECIAL_IMPORT_TO_WARD_NOT_EXIT',
                );
                $idCustomer = 0;
                foreach ($customers as $customer) {
                    if ($customer->getCustomerNo() === strval($value['account_no'])) {
                        $idCustomer = $customer->getId();
                        unset($error['customer']);
                        break;
                    }
                }
                $idArea = 0;
                foreach ($areas as $area) {
                    if ($area->getName() === $value['area_name']) {
                        $idArea = $area->getId();
                        unset($error['area']);
                        break;
                    }
                }

                $idFromCity = 0;
                foreach ($fromCity as $frCity) {
                    if ($frCity->getName() === $value['from_city']) {
                        $idFromCity = $frCity->getId();
                        unset($error['fromCity']);
                        break;
                    }
                }
                $idToCity = 0;
                foreach ($toCity as $tCity) {
                    if ($tCity->getName() === $value['to_city']) {
                        $idToCity = $tCity->getId();
                        unset($error['toCity']);
                        break;
                    }
                }
                $idToDistrict = 0;
                foreach ($toDistrict as $tDistrict) {
                    if ($tDistrict->getName() === $value['to_district']) {
                        $idToDistrict = $tDistrict->getId();
                        unset($error['toDistrict']);
                        break;
                    }
                }
                $idToWard = 0;
                foreach ($toWard as $tWard) {
                    if ($tWard->getName() === $value['to_ward']) {
                        $idToWard = $tWard->getId();
                        unset($error['toWard']);
                        break;
                    }
                }

                if (!$error) {
                    $specialZone = $this->entityManager->getRepository(SpecialZone::class)->checkExit([
                        'name' => $value['name'],
                        'name_en' => $value['name_en'],
                        'customer' => $idCustomer,
                        'special_area' => $idArea,
                        'from_city' => $idFromCity,
                        'to_city' => $idToCity,
                        'to_district' => $idToDistrict,
                        'to_ward' => $idToWard,
                        'is_deleted' => 0,
                    ]);

                    if ($specialZone) {
                        $value['error'] = 'SPECIAL_IMPORT_ZONE_EXIT';
                    }
                } else {
                    $value['error'] = $error;
                }

                $dataResult[$i] = $value;
                $data[$i]['id_customer'] = $idCustomer;
                $data[$i]['id_special_area'] = $idArea;
                $data[$i]['id_from_city'] = $idFromCity;
                $data[$i]['id_to_city'] = $idToCity;
                $data[$i]['id_to_district'] = $idToDistrict;
                $data[$i]['id_to_ward'] = $idToWard;
            }

            $this->apiResponse = array(
                'data' => $dataResult,
                'total' => $LastColumn,
            );

            return $this->createResponse();
        }
    }

    public function saveImportAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->cache->getItem('specialZone', $result);
            if ($result) {
                $dataPost = $this->getRequestData();
                if (isset($dataPost['ids']) && is_array($dataPost['ids'])) {
                    foreach ($dataPost['ids'] as $id) {
                        unset($data[0]);
                    }
                }
                $this->specialZoneManager->addZoneImport($data, $this->tokenPayload);

                $this->cache->removeItem('specialZone');
                $this->apiResponse['message'] = "SPECIAL_IMPORTED";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_IMPORT_NONE";
            }
        }
        return $this->createResponse();
    }
}
