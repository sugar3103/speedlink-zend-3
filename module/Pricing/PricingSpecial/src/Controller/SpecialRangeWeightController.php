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
                move_uploaded_file($fileUpdate['tmp_name'], $location . $fileUpdate['name']);
                $file = $location . $fileUpdate['name'];
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
                for ($i = 1; $i <= $Totalrow; $i++) {
                    //----Lặp cột
                    for ($j = 1; $j <= $TotalCol; $j++) {
                        // Tiến hành lấy giá trị của từng ô đổ vào mảng
                        $data[$i - 1][$nameField[$j - 1]] = $sheet->getCellByColumnAndRow($j, $i)->getValue();
                    }
                }

                // Save Data to cache.
                $this->cache->setItem('specialRangeWeight', $data);

            } else {
                $Totalrow = count($data);
            }

            $dataResult = array_slice($data, $start, $lenght);

            $this->apiResponse = array(
                'data' => $dataResult,
                'total' => (int) $Totalrow,
            );

            return $this->createResponse();
        }
    }
}
