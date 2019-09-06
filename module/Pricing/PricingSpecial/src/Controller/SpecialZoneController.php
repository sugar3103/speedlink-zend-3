<?php
namespace PricingSpecial\Controller;

set_time_limit(3000);

use Address\Entity\City;
use Core\Controller\CoreController;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
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
                $zone = $this->entityManager->getRepository(SpecialZone::class)->findOneBy(array('id' => $data['id']));
                if ($area) {
                    //Create Form Zone
                    $form = new ZoneForm('update', $this->entityManager, $zone);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        $data['id'] = $zone->getId();
                        $preData = $this->entityManager->getRepository(SpecialZone::class)->checkExitWithAddress($data);
                        if (isset($preData[0]) && ($preData[0]['id'] != $zone->getId())) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "SPECIAL_ZONE_HAD_BEEN_EXISTED";
                        } else {
                            // update Special Zone.
                            $this->specialZoneManager->updateZone($zone, $data, $user);
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

        $nameField = [
            0 => 'id',
            1 => 'name',
            2 => 'name_en',
            3 => 'from_city',
            4 => 'to_city',
            5 => 'to_district',
            6 => 'to_ward',
            7 => 'account_no',
            8 => 'area_name',
        ];
        $headers = [];
        //Tạo mảng chứa dữ liệu
        // $this->cache->removeItem('specialZone');die;
        $start = 0;
        $lenght = 1000;
        $data = [];

        if ($this->getRequest()->isPost()) {
            $fileUpdate = $this->params()->fromFiles('import_file');
            if ($fileUpdate) {
                $this->cache->removeItem('specialZone');
                // Upload path
                $location = dirname(__DIR__, 5) . "/data/files/";
                move_uploaded_file($fileUpdate['tmp_name'], $location . $fileUpdate['name']);
                $file = $location . $fileUpdate['name'];
            }

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
                
                //Get Headers
                for ($j = 1; $j <= $TotalCol; $j++) {
                    // Tiến hành lấy giá trị của từng ô đổ vào mảng
                    $headers[] = $sheet->getCellByColumnAndRow($j, 2)->getValue();
                }

                if (!$this->checkFormatFile($headers, $nameField)) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "SPECIAL_IMPORT_FILE_INCORRECT";

                    return $this->createResponse();
                }
                //Tiến hành lặp qua từng ô dữ liệu
                //----Lặp dòng, Vì dòng đầu là tiêu đề cột nên chúng ta sẽ lặp giá trị từ dòng 2
                for ($i = 3; $i <= $Totalrow; $i++) {
                    //----Lặp cột
                    for ($j = 1; $j <= $TotalCol; $j++) {
                        // Tiến hành lấy giá trị của từng ô đổ vào mảng
                        $data[$i - 3][$nameField[$j - 1]] = $sheet->getCellByColumnAndRow($j, $i)->getValue();
                    }

                    if (isset($data[$i - 3]) && ($data[$i - 3]['id'] == null)) {
                        unset($data[$i - 3]);
                    }
                }

                // Save Data to cache.
                $this->cache->setItem('specialZone', $data);
            }

            $Totalrow = count($data);
            $dataResult = array_slice($data, $start, $lenght);

            for ($i = 0; $i < count($dataResult); $i++) {
                $error = false;
                $value = $dataResult[$i];
                $error = array(
                    'name' => 'SPECIAL_IMPORT_NAME_NOT_NULL',
                    'name_en' => 'SPECIAL_IMPORT_NAME_EN_NOT_NULL',                    
                    'customer' => 'SPECIAL_IMPORT_CUSTOMER_NOT_EXITS',
                    'area' => 'SPECIAL_IMPORT_AREA_NOT_EXITS',
                    'fromCity' => 'SPECIAL_IMPORT_FROM_CITY_NOT_EXITS',
                    'toAddress' => 'SPECIAL_IMPORT_TO_ADDRESS_NOT_EXITS',
                );
                if($value['name'] != "") {
                    unset($error['name']);
                }
                if($value['name_en'] != "") {
                    unset($error['name_en']);
                }
                $idCustomer = 0;
                $idArea = 0;
                $accountNo = $this->entityManager->getRepository(\Customer\Entity\Customer::class)->findOneBy([
                    'customer_no' => $value['account_no'],
                    'status' => 1,
                    'is_deleted' => 0]);

                if ($accountNo) {
                    unset($error['customer']);
                    $idCustomer = $accountNo->getId();
                    $value['customer_id'] = $accountNo->getId();
                    $value['customer_name'] = $accountNo->getName();
                    $special_area_name = $this->entityManager->getRepository(\PricingSpecial\Entity\SpecialArea::class)->findOneBy([
                        'name' => $value['area_name'],
                        'customer' => $accountNo,
                        'is_deleted' => 0,
                    ]);
    
                    if ($special_area_name) {
                        unset($error['area']);
                        $value['area_id'] = $special_area_name->getId();
                        $idArea = $special_area_name->getId();
                    }
                } else {
                    $value['customer_id'] = 0;
                    $value['customer_name'] = $value['account_no'];
                }
                
                $idFromCity = 0;
                $fromCity = $this->entityManager->getRepository(City::class)->findOneBy([
                    'name' => $value['from_city'],
                    'is_deleted' => 0,
                ]);

                if ($fromCity) {
                    $idFromCity = $fromCity->getId();
                    unset($error['fromCity']);
                }

                $toAddress = $this->entityManager->getRepository(SpecialZone::class)->vertifyAddress(
                    $value['to_city'],
                    $value['to_district'],
                    $value['to_ward']
                );

                $idToCity = 0;
                $idToDistrict = 0;
                $idToWard = 0;

                if ($toAddress) {
                    $ormPaginator = new ORMPaginator($toAddress, true);

                    $ormPaginator->setUseOutputWalkers(false);
                    //get special area list

                    $toAddresses = $ormPaginator->getIterator()->getArrayCopy();
                    if (isset($toAddresses[0])) {
                        $idToCity = $toAddresses[0]['city_id'];
                        $idToDistrict = $toAddresses[0]['district_id'];
                        $idToWard = $toAddresses[0]['ward_id'];
                        unset($error['toAddress']);
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
            }

            $this->apiResponse = array(
                'data' => $dataResult,
                'total' => (int) $Totalrow,
            );

            return $this->createResponse();
        }
    }

    private function checkFormatFile($headers, $nameField)
    {

        if (!$headers) {
            return false;
        } else {
            foreach ($headers as $header) {
                if ($header == 'STT') {
                    $header = 'id';
                }

                $header = strtolower(str_replace(" ", "_", $header));
                if (!in_array($header, $nameField)) {
                    return false;
                }
            }
        }
        return true;
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
                $errors = $this->specialZoneManager->addZoneImport($data, $this->tokenPayload);

                $this->cache->removeItem('specialZone');
                $this->apiResponse['message'] = "SPECIAL_IMPORTED";
                // if ($errors) {
                //     $this->apiResponse['errors'] = $errors;
                // }
                $this->apiResponse['total'] = count($data);
                $this->apiResponse['total_success'] = ($errors) ? (count($data) - count($errors)) : count($data);
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_IMPORT_NONE";
            }
        }
        return $this->createResponse();
    }

    public function downloadAction()
    {
        $fileName = dirname(__DIR__, 5) . "/data/files/sample/special_zone_sample.xlsx";

        $response = new \Zend\Http\Response\Stream();
        $response->setStream(fopen($fileName, 'r'));
        $response->setStatusCode(200);

        $headers = new \Zend\Http\Headers();
        $headers->addHeaderLine('Content-Type', 'whatever your content type is')
            ->addHeaderLine('Content-Disposition', 'attachment; filename="special_zone.xlsx"')
            ->addHeaderLine('Content-Length', filesize($fileName));

        $response->setHeaders($headers);
        return $response;
    }
}
