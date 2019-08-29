<?php
namespace PricingSpecial\Controller;

use Core\Controller\CoreController;
use Doctrine\ORM\EntityManager;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PricingSpecial\Entity\SpecialRangeWeight;
use PricingSpecial\Form\RangeWeightForm;
use PricingSpecial\Service\SpecialRangeWeightManager;
use Zend\Cache\Storage\StorageInterface;

class SpecialRangeWeightController extends CoreController
{
    /**
     * EntityManager.
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * Customer Manager.
     * @var SpecialRangeWeightManager
     */
    protected $specialRangeWeightManager;

    /**
     * CustomerController constructor.
     * @param $entityManager
     * @param $specialRangeWeightManager
     */

    /**
     * StorageInterface
     * @var $cache
     */

    protected $cache;

    public function __construct($entityManager, $specialRangeWeightManager, $cache)
    {
        parent::__construct($entityManager);
        $this->entityManager = $entityManager;
        $this->specialRangeWeightManager = $specialRangeWeightManager;
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
                3 => 'category_id',
                4 => 'carrier_id',
                5 => 'service_id',
                6 => 'shipment_type_id',
                7 => 'status',
                8 => 'calculate_unit',
                9 => 'round_up',
                10 => 'zone_id',
                12 => 'from',
                13 => 'to',
                15 => 'customer_id',
                16 => 'special_area_id',
            ];

            list($start, $limit, $sortField, $sortDirection, $filters, $fields) = $this->getRequestData($fieldsMap);
            //get list User by condition
            $dataRangeWeight = $this->specialRangeWeightManager->getListSpecialRangeWeightByCondition($start, $limit, $sortField, $sortDirection, $filters);

            $result = $this->filterByField($dataRangeWeight['listRangeWeight'], $fields);

            $this->apiResponse = array(
                'data' => $result,
                'total' => $dataRangeWeight['totalRangeWeight'],
            );
        }
        return $this->createResponse();
    }

    public function addAction()
    {
        // check if Special RangeWeight  has submitted the form
        if ($this->getRequest()->isPost()) {
            $user = $this->tokenPayload;

            //Create New Form Special RangeWeight
            $form = new RangeWeightForm('create', $this->entityManager);

            $form->setData($this->getRequestData());
            //validate form
            if ($form->isValid()) {
                // get filtered and validated data
                $data = $form->getData();
                // add Special RangeWeight.
                $this->specialRangeWeightManager->addRangeWeight($data, $user);
                $this->apiResponse['message'] = "ADD_SUCCESS_SPECIAL_RANGEWEIGHT";
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
                // Find existing Special RangeWeight in the database.
                $area = $this->entityManager->getRepository(SpecialRangeWeight::class)->findOneBy(array('id' => $data['id']));
                if ($area) {
                    //Create Form RangeWeight
                    $form = new RangeWeightForm('update', $this->entityManager, $area);
                    $form->setData($data);
                    //validate form
                    if ($form->isValid()) {
                        // get filtered and validated data
                        $data = $form->getData();
                        // update Special RangeWeight.
                        $this->specialRangeWeightManager->updateRangeWeight($area, $data, $user);
                        $this->apiResponse['message'] = "MODIFIED_SUCCESS_SPECIAL_RANGEWEIGHT";
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
                $this->apiResponse['message'] = "SPECIAL_RANGEWEIGHT_REQUEST_ID";
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
                        $rangeWeight = $this->entityManager->getRepository(SpecialRangeWeight::class)->findOneBy(array('id' => $id, 'is_deleted' => 0));
                        if ($rangeWeight == null) {
                            $this->error_code = 0;
                            $this->apiResponse['message'] = "NOT_FOUND";
                        } else {
                            $this->specialRangeWeightManager->deleteRangeWeight($rangeWeight, $user);
                            $this->apiResponse['message'] = "DELETE_SUCCESS_SPECIAL_RANGEWEIGHT";
                        }
                    }

                } catch (\Throwable $th) {
                    $this->error_code = 0;
                    $this->apiResponse['message'] = "SPECIAL_RANGEWEIGHT_REQUEST_ID";
                }
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_RANGEWEIGHT_REQUEST_ID";
            }
        }
        return $this->createResponse();
    }

    public function importAction()
    {
        $nameField = [
            0 => 'id',
            1 => 'name',
            2 => 'account_no',
            3 => 'from',
            4 => 'to',
            5 => 'carrier',
            6 => 'service',
            7 => 'shipment_type',
            8 => 'special_area_name',
            9 => 'calculate_unit',
            10 => 'unit',
            11 => 'round_up',
            12 => 'status',
        ];
        $start = 0;
        $lenght = 1000;
        $data = [];
        $file = null;
        if ($this->getRequest()->isPost()) {
            $fileUpdate = $this->params()->fromFiles('import_file');
            if ($fileUpdate) {
                $this->cache->removeItem('specialRangeWeight');
                // Upload path
                $location = dirname(__DIR__, 5) . "/data/files/";
                move_uploaded_file($fileUpdate['tmp_name'], $location . str_replace(" ", "_", $fileUpdate['name']));
                $file = $location . str_replace(" ", "_", $fileUpdate['name']);
            }

            $dataPost = $this->getRequestData();
            $offset = isset($dataPost['offset']) ? $dataPost['offset'] : 0;
            if ($offset) {
                $lenght = isset($offset['limit']) ? $offset['limit'] : 1000;
                $start = isset($offset['start']) ? ($lenght * ($offset['start'] - 1)) : 0;
            }

            $data = $this->cache->getItem('specialRangeWeight', $result);

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
                for ($i = 3; $i <= $Totalrow; $i++) {
                    //----Lặp cột
                    for ($j = 1; $j <= $TotalCol; $j++) {
                        // Tiến hành lấy giá trị của từng ô đổ vào mảng
                        $data[$i - 2][$nameField[$j - 1]] = $sheet->getCellByColumnAndRow($j, $i)->getValue();
                    }
                }
                // Save Data to cache.
                $this->cache->setItem('specialRangeWeight', $data);

            } else {
                $Totalrow = count($data);
            }

            $dataResult = array_slice($data, $start, $lenght);

            for ($i = 0; $i < count($dataResult); $i++) {
                $error = false;
                $value = $dataResult[$i];                
                $error = array(
                    'name'  => 'SPECIAL_IMPORT_NAME_NOT_NULL',
                    'from'  => 'SPECIAL_IMPORT_FROM_NOT_NULL_OR_NOT_NUMBER',
                    'to'  => 'SPECIAL_IMPORT_TO_NOT_NULL_OR_NOT_NUMBER',
                    'customer' => 'SPECIAL_IMPORT_CUSTOMER_NOT_EXITS',
                    'area' => 'SPECIAL_IMPORT_AREA_NOT_EXITS',
                    'carrier' => 'SPECIAL_IMPORT_CARRIER_NOT_EXITS',
                    'service' => 'SPECIAL_IMPORT_SERVICE_NOT_EXITS',
                    'shipment_type' => 'SPECIAL_IMPORT_SHIPMENT_TYPE_NOT_EXITS',
                );
                if($value['name']) {
                    unset($error['name']);
                }

                if($value['from'] && is_numeric($value['from'])) {
                    unset($error['from']);
                }

                if($value['to'] && is_numeric($value['to'])) {
                    unset($error['to']);
                }
               
                $accountNo = $this->entityManager->getRepository(\Customer\Entity\Customer::class)->findOneBy([
                    'customer_no' => $value['account_no'],
                    'is_deleted' => 0]);

                if ($accountNo) {
                    unset($error['customer']);
                    $value['customer_id'] = $accountNo->getId();
                } else {
                    $value['customer_id'] = 0;
                }

                $special_area_name = $this->entityManager->getRepository(\PricingSpecial\Entity\SpecialArea::class)->findOneBy([
                    'name' => $value['special_area_name'],
                    'customer' => $accountNo,
                    'is_deleted' => 0,
                ]);

                if ($special_area_name) {
                    unset($error['area']);
                }

                $carrier = $this->entityManager->getRepository(\ServiceShipment\Entity\Carrier::class)->findOneBy([
                    'code' => $value['carrier'],
                    'is_deleted' => 0,
                    'status' => 1,
                ]);
                if ($carrier) {
                    unset($error['carrier']);
                    $value['carrier_id'] = $carrier->getId();
                    $value['carrier'] = $carrier->getName();
                    $value['carrier_en'] = $carrier->getNameEn();
                } else {
                    $value['carrier_id'] = 0;
                    $value['carrier'] = $value['carrier'];
                    $value['carrier_en'] = $value['carrier'];
                }

                $service = $this->entityManager->getRepository(\ServiceShipment\Entity\Service::class)->findOneBy([
                    'name' => $value['service'],
                    'is_deleted' => 0,
                    'status' => 1,
                ]);

                if ($service) {
                    unset($error['service']);
                    $value['service_id'] = $service->getId();
                    $value['service'] = $service->getName();
                    $value['service_en'] = $service->getNameEn();
                } else {
                    $value['service_id'] = 0;
                    $value['service'] = $value['service'];
                    $value['service_en'] = $value['service'];
                }

                $shipment_type = $this->entityManager->getRepository(\ServiceShipment\Entity\ShipmentType::class)->findOneBy([
                    'name' => $value['shipment_type'],
                    'is_deleted' => 0,
                    'status' => 1,
                ]);

                if ($shipment_type) {
                    unset($error['shipment_type']);
                    $value['shipment_type_id'] = $shipment_type->getId();
                    $value['shipment_type'] = $shipment_type->getName();
                    $value['shipment_type_en'] = $shipment_type->getNameEn();
                } else {
                    $value['shipment_type_id'] = 0;
                    $value['shipment_type'] = $value['shipment_type'];
                    $value['shipment_type_en'] = $value['shipment_type'];
                }

               

                if (!$error) {
                    $value['status'] = ($value['status'] == 'Active') ? 1 : 0;
                    $value['calculate_unit'] = ($value['calculate_unit'] == 'Yes') ? 1 : 0;
                    $specialRangeWeight = $this->entityManager->getRepository(SpecialRangeWeight::class)->findOneBy(
                        [
                            'customer' => $accountNo,
                            'name' => $value['name'],
                            'is_deleted' => 0,
                        ]
                    );
                    if ($specialRangeWeight) {
                        $value['error'] = 'SPECIAL_IMPORT_RANGE_WEIGHT_EXIT';
                    }
                } else {
                    $value['error'] = $error;
                }

                $dataResult[$i] = $value;
            }

            $this->apiResponse = array(
                'data' => $dataResult,
                'total' => (int) $Totalrow - 2,
            );

            return $this->createResponse();
        }
    }

    public function saveImportAction()
    {
        if ($this->getRequest()->isPost()) {
            $data = $this->cache->getItem('specialRangeWeight', $result);
            if ($result) {
                $dataPost = $this->getRequestData();
                if (isset($dataPost['ids']) && is_array($dataPost['ids'])) {
                    foreach ($dataPost['ids'] as $id) {
                        unset($data[$id]);
                    }
                }
                $errors = $this->specialRangeWeightManager->addRangeWeightImport($data, $this->tokenPayload);

                $this->cache->removeItem('specialRangeWeight');
                if($errors) {
                    $this->apiResponse['errors'] = $errors;    
                }
                $this->apiResponse['message'] = "SPECIAL_IMPORTED";
            } else {
                $this->error_code = 0;
                $this->apiResponse['message'] = "SPECIAL_IMPORT_NONE";
            }
        }
        return $this->createResponse();
    }

    public function downloadAction() {
        $fileName = dirname(__DIR__, 5) . "/data/files/special_range_weight_sample.xlsx";
        
        $response = new \Zend\Http\Response\Stream();
        $response->setStream(fopen($fileName, 'r'));
        $response->setStatusCode(200);
    
        $headers = new \Zend\Http\Headers();
        $headers->addHeaderLine('Content-Type', 'whatever your content type is')
                ->addHeaderLine('Content-Disposition', 'attachment; filename="special_range_weight.xlsx"')
                ->addHeaderLine('Content-Length', filesize($fileName));
    
        $response->setHeaders($headers);
        return $response;
    }
}
