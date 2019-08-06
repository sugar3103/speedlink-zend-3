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
            $fieldsMap = [0 => 'id', 1 => 'name', 2 => 'name_en', 3 => 'created_at'];

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
                // add Special Zone.
                $this->specialZoneManager->addZone($data, $user);
                $this->apiResponse['message'] = "ADD_SUCCESS_SPECIAL_ZONE";
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
                        // update Special Zone.
                        $this->specialZoneManager->updateZone($area, $data, $user);
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS_SPECIAL_ZONE";
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
        $nameField = [
            0 => 'name',
            1 => 'name_en',
            2 => 'from_city',
            3 => 'to_city',
            4 => 'to_district',
            5 => 'to_ward',
            6 => 'account_no',
            7 => 'area_name'
        ];
        //Tạo mảng chứa dữ liệu
        // $this->cache->removeItem('specialZone');die;
        $start = 0;
        $lenght = 1000;
        $data = [];

        if ($this->getRequest()->isPost()) {
            $dataPost = $this->getRequestData();
            $offset = isset($dataPost['offset']) ? $dataPost['offset'] : 0;
            if ($offset) {
                $lenght = isset($offset['limit']) ? $offset['limit'] : 1000;
                $start = isset($offset['start']) ? ($lenght * ($offset['start'] - 1)) : 0;
            }

            $data = $this->cache->getItem('specialZone', $result);
            if (!$result) {
                // $this->cache->removeItem('rbac_container');
                $file = __DIR__ . "/data.xlsx";
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

            for ($i = 0; $i < count($dataResult); $i++) {
                $error = false;
                $value = $dataResult[$i];
                $value['id'] = $i;

                $customer = $this->entityManager->getRepository(Customer::class)->findOneBy(array('customer_no' => $value['account_no'], 'is_deleted' => 0));
                if (!$customer) {
                    $error['customer'] = 'SPECIAL_IMPORT_CUSTOMER_NOT_EXIT';
                }

                $area = $this->entityManager->getRepository(SpecialArea::class)->findOneBy(array('name' => $value['area_name'], 'is_deleted' => 0));
                if (!$area) {
                    $error['area'] = 'SPECIAL_IMPORT_AREA_NOT_EXIT';
                }

                $fromCity = $this->entityManager->getRepository(City::class)->findOneBy(['name' => $value['from_city'], 'is_deleted' => 0]);
                if (!$fromCity) {$error['fromCity'] = 'SPECIAL_IMPORT_FROM_CITY_NOT_EXIT';}
                $toCity = $this->entityManager->getRepository(City::class)->findOneBy(['name' => $value['to_city'], 'is_deleted' => 0]);
                if (!$toCity) {$error['toCity'] = 'SPECIAL_IMPORT_TO_CITY_NOT_EXIT';}
                $toDistrict = $this->entityManager->getRepository(District::class)->findOneBy(['name' => $value['to_district'], 'is_deleted' => 0]);
                if (!$toDistrict) {$error['toDistrict'] = 'SPECIAL_IMPORT_TO_DISTRICT_NOT_EXIT';}
                $toWard = $this->entityManager->getRepository(Ward::class)->findOneBy(['name' => $value['to_ward'], 'is_deleted' => 0]);
                if (!$toWard) {$error['toWard'] = 'SPECIAL_IMPORT_TO_WARD_NOT_EXIT';}

                //Check Exit
                if (!$error) {
                    $specialZone = $this->entityManager->getRepository(SpecialZone::class)->findOneBy([
                        'name' => $value['name'],
                        'name' => $value['name_en'],
                        'customer' => $customer,
                        'special_area' => $area,
                        'from_city' => $fromCity,
                        'to_city' => $toCity,
                        'to_district' => $toDistrict,
                        'to_ward' => $toWard,
                        'is_deleted' => 0,
                    ]);

                    if ($specialZone) {
                        $value['error'] = 'SPECIAL_IMPORT_ZONE_EXIT';
                    }
                } else {
                    $value['error'] = $error;
                }

                $dataResult[$i] = $value;   
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
            if($result) {
                $dataPost = $this->getRequestData();

            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_IMPORT_NONE";
            }
        }
        return $this->createResponse();
    }
}
