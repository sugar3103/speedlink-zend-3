<?php
namespace PricingDomestic\Service;

use Core\Utils\Utils;
use Customer\Entity\Customer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use OAuth\Entity\User;
use PricingDomestic\Entity\DomesticPricing;
use PricingDomestic\Entity\DomesticPricingData;
use PricingDomestic\Entity\DomesticPricingVas;
use PricingDomestic\Entity\DomesticPricingVasSpec;
use PricingDomestic\Entity\DomesticRangeWeight;
use PricingDomestic\Servivce\DomesticPricingDataManager;
use PricingDomestic\Servivce\DomesticPricingVasManager;
use PricingDomestic\Servivce\DomesticRangeWeightManager;
use ServiceShipment\Entity\Carrier;
use ServiceShipment\Entity\Category;
use ServiceShipment\Entity\Service;

/**
 * This service is responsible for adding/editing users
 * and changing user password.
 * @package PricingDomestic\Service
 */
class DomesticPricingManager
{

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var DomesticPricingCityManager
     */
    private $domesticPricingDataManager;

    /**
     * @var DomesticRangeWeightManager
     */
    private $domesticRangeWeightManager;

    /**
     * BranchManager constructor.
     * @param $entityManager
     * @param $domesticPricingDataManager
     * @param $domesticPricingVasManager
     */
    public function __construct($entityManager, $domesticPricingDataManager, $domesticPricingVasManager, $domesticRangeWeightManager)
    {
        $this->entityManager = $entityManager;
        $this->domesticPricingDataManager = $domesticPricingDataManager;
        $this->domesticPricingVasManager = $domesticPricingVasManager;
        $this->domesticRangeWeightManager = $domesticRangeWeightManager;
    }

    /**
     * Get List Domestic Pricing By Condition
     */

    public function getListDomesticPricingByCondition($start, $limit, $sortField, $sortDirection, $filters)
    {
        $pricings = [];
        $totalPricing = 0;
        //get orm Domestic Pricing
        $ormPricing = $this->entityManager->getRepository(DomesticPricing::class)
            ->getListDomesticPricingByCondition($start, $limit, $sortField, $sortDirection, $filters);
        if ($ormPricing) {
            //set offset,limit
            $ormPaginator = new ORMPaginator($ormPricing, true);
            $ormPaginator->setUseOutputWalkers(false);
            $totalPricing = $ormPaginator->count();
            //get domestic pricing list

            $pricings = $ormPaginator->getIterator()->getArrayCopy();

            foreach ($pricings as &$pricing) {
                $pricing['effected_date'] = ($pricing['effected_date']) ? Utils::checkDateFormat($pricing['effected_date'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $pricing['expired_date'] = ($pricing['expired_date']) ? Utils::checkDateFormat($pricing['expired_date'], 'D M d Y H:i:s \G\M\T+0700') : '';

                $pricing['created_at'] = ($pricing['created_at']) ? Utils::checkDateFormat($pricing['created_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $pricing['updated_at'] = ($pricing['updated_at']) ? Utils::checkDateFormat($pricing['updated_at'], 'D M d Y H:i:s \G\M\T+0700') : '';
                $pricing['full_name_created'] = trim($pricing['full_name_created']);
                $pricing['full_name_updated'] = trim($pricing['full_name_updated']);
            }
        }

        //set data user
        $dataPricing = [
            'listPricing' => $pricings,
            'totalPricing' => $totalPricing,
        ];

        return $dataPricing;
    }

    /**
     * Add Domestic Pricing
     */
    public function addPricing($data, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            $domesticPricing = new DomesticPricing();
            $domesticPricing->setEffectedDate(date('Y-m-d H:i:s', strtotime($data['effected_date'])));
            $domesticPricing->setExpiredDate(date('Y-m-d H:i:s', strtotime($data['expired_date'])));
            $domesticPricing->setIsPrivate($data['is_private']);
            $domesticPricing->setStatus($data['status']);
            $domesticPricing->setApprovalStatus($data['approval_status']);
            $domesticPricing->setTotalRas($data['total_ras']);

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));

            $domesticPricing->setCreatedAt($addTime->format('Y-m-d H:i:s'));
            $domesticPricing->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($domesticPricing, $user, 'add', $data);

            $this->entityManager->persist($domesticPricing);

            $this->entityManager->flush();

            $this->entityManager->commit();

            if ($data['get_pricing_dom']) {
                $conditions = array(
                    'domestic_pricing' => $data['get_pricing_dom'],
                    'is_deleted' => 0,
                );

                $pricingDataClones = $this->entityManager->getRepository(DomesticPricingData::class)->findBy($conditions);

                if ($pricingDataClones) {
                    foreach ($pricingDataClones as $pricingDataClone) {
                        //Create New RangeWeight
                        // $pricingDataClone->getDomesticRangeWeight();
                        $rangeweight = $this->domesticRangeWeightManager->addRangeWeight([
                            'name' => $pricingDataClone->getDomesticRangeWeight()->getName(),
                            'name_en' => $pricingDataClone->getDomesticRangeWeight()->getNameEn(),
                            'calculate_unit' => $pricingDataClone->getDomesticRangeWeight()->getCalculateUnit(),
                            'round_up' => $pricingDataClone->getDomesticRangeWeight()->getRoundUp(),
                            'unit' => $pricingDataClone->getDomesticRangeWeight()->getUnit(),
                            'is_ras' => $pricingDataClone->getDomesticRangeWeight()->getIsRas(),
                            'from' => $pricingDataClone->getDomesticRangeWeight()->getFrom(),
                            'to' => $pricingDataClone->getDomesticRangeWeight()->getTo(),
                            'status' => $pricingDataClone->getDomesticRangeWeight()->getStatus(),
                            'description' => $pricingDataClone->getDomesticRangeWeight()->getDescription(),
                            'description_en' => $pricingDataClone->getDomesticRangeWeight()->getDescriptionEn(),
                            'is_private' => $data['is_private'],
                            'carrier_id' => $pricingDataClone->getDomesticRangeWeight()->getCarrier()->getId(),
                            'category_id' => $pricingDataClone->getDomesticRangeWeight()->getCategory()->getId(),
                            'service_id' => $pricingDataClone->getDomesticRangeWeight()->getService()->getId(),
                            'shipment_type_id' => $pricingDataClone->getDomesticRangeWeight()->getShipmentType()->getId(),
                            'zone_id' => $pricingDataClone->getDomesticRangeWeight()->getZone()->getId(),
                            'customer_id' => $data['customer_id'],
                        ],
                            $user
                        );
                        $this->entityManager->beginTransaction();

                        $pricingData = new DomesticPricingData();
                        $pricingData->setDomesticPricing($domesticPricing);
                        $pricingData->setDomesticRangeWeight($rangeweight);
                        $pricingData->setValue($pricingDataClone->getValue());
                        $pricingData->setType($pricingDataClone->getType());
                        $pricingData->setTypeValue($pricingDataClone->getTypeValue());
                        $pricingData->setCreatedBy($this->entityManager->getRepository(User::class)->find($user->id));
                        $pricingData->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));
                        $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
                        $pricingData->setCreatedAt($addTime->format('Y-m-d H:i:s'));
                        $pricingData->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

                        $this->entityManager->persist($pricingData);
                        // apply changes to database.
                        $this->entityManager->flush();
                        $this->entityManager->commit();
                    }

                }

                $pricingVasClones = $this->entityManager->getRepository(DomesticPricingVas::class)->findBy($conditions);
                if ($pricingVasClones) {
                    foreach ($pricingVasClones as $pricingVasClone) {
                        $this->entityManager->beginTransaction();
                        $pricingVas = new DomesticPricingVas();
                        $pricingVas->setCreatedBy($this->entityManager->getRepository(User::class)->find($user->id));
                        $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
                        $pricingVas->setCreatedAt($addTime->format('Y-m-d H:i:s'));
                        $pricingVas->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));
                        $pricingVas->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
                        $pricingVas->setDomesticPricing($domesticPricing);

                        $pricingVas->setName($pricingVasClone->getName());
                        $pricingVas->setNameEn($pricingVasClone->getNameEn());
                        $pricingVas->setMin($pricingVasClone->getMin());
                        $pricingVas->setFormula($pricingVasClone->getFormula());
                        $pricingVas->setType($pricingVasClone->getType());

                        $this->entityManager->persist($pricingVas);

                        // apply changes to database.
                        $this->entityManager->flush();
                        $this->entityManager->commit();
                        $pricingVasSpecClones = $this->entityManager->getRepository(DomesticPricingVasSpec::class)->findBy([
                            'domestic_pricing_vas' => $pricingVasClone->getId(),
                        ]);

                        if ($pricingVasSpecClones) {
                            foreach ($pricingVasSpecClones as $$pricingVasSpecClone) {
                                $vasSpec = new DomesticPricingVasSpec();
                                $vasSpec->setDomesticPricing($domesticPricing);
                                $vasSpec->setDomesticPricingVas($pricingVas);
                                $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
                                //Created
                                $vasSpec->setCreatedBy($this->entityManager->getRepository(User::class)->find($user->id));
                                $vasSpec->setCreatedAt($addTime->format('Y-m-d H:i:s'));

                                $vasSpec->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));
                                $vasSpec->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

                                $vasSpec->setFrom($pricingVasSpecClone->getFrom());
                                $vasSpec->setTo($pricingVasSpecClone->getTo());
                                $vasSpec->setValue($pricingVasSpecClone->getValue());
                                $vasSpec->setIsDeleted(0);

                                $this->entityManager->persist($vasSpec);

                                // // apply changes to database.
                                $this->entityManager->flush();
                                $this->entityManager->commit();
                            }
                        }

                    }
                }
            }

            return $domesticPricing;

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Update Domestic Pricing
     */
    public function updatePricing($domesticPricing, $data, $user)
    {

        $this->entityManager->beginTransaction();
        try {

            $domesticPricing->setEffectedDate(date('Y-m-d H:i:s', strtotime($data['effected_date'])));
            $domesticPricing->setExpiredDate(date('Y-m-d H:i:s', strtotime($data['expired_date'])));
            $domesticPricing->setIsPrivate($data['is_private']);
            $domesticPricing->setStatus($data['status']);
            $domesticPricing->setApprovalStatus($data['approval_status']);
            $domesticPricing->setTotalRas($data['total_ras']);

            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticPricing->setUpdatedAt($addTime->format('Y-m-d H:i:s'));
            $this->getReferenced($domesticPricing, $user, 'update', $data);

            // apply changes to database.
            $this->entityManager->flush();
            $this->entityManager->commit();

            return $domesticPricing;
        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    /**
     * Delete Domestic Pricing
     */
    public function deletePricing($domesticPricing, $user)
    {

        $this->entityManager->beginTransaction();
        try {
            $domesticPricing->setIsDeleted(1);
            $domesticPricing->setUpdatedBy($this->entityManager->getRepository(User::class)->find($user->id));
            $addTime = new \DateTime('now', new \DateTimeZone('UTC'));
            $domesticPricing->setUpdatedAt($addTime->format('Y-m-d H:i:s'));

            // apply changes to database.
            $this->entityManager->flush();
            // $last_id = $rangeweight->getBranchId();
            $this->entityManager->commit();

        } catch (ORMException $e) {
            $this->entityManager->rollback();
            return false;
        }
    }

    private function getReferenced(&$domesticPricing, $user, $mode = '', $data)
    {
        $user_data = $this->entityManager->getRepository(User::class)->find($user->id);
        if ($user_data == null) {
            throw new \Exception('Not found User by ID');
        }

        if ($mode == 'add') {
            $domesticPricing->setCreatedBy($user_data);
        }

        $carrier = $this->entityManager->getRepository(Carrier::class)->find($data['carrier_id']);
        if ($carrier == null) {
            throw new \Exception('Not found Carrier by ID');
        }

        $category = $this->entityManager->getRepository(Category::class)->find($data['category_id']);
        if ($category == null) {
            throw new \Exception('Not found Category by ID');
        }
        $service = $this->entityManager->getRepository(Service::class)->find($data['service_id']);
        if ($service == null) {
            throw new \Exception('Not found Service by ID');
        }
        $saleman = $this->entityManager->getRepository(User::class)->find($data['saleman_id']);
        if ($saleman == null) {
            throw new \Exception('Not found Saleman by ID');
        }
        $approval = $this->entityManager->getRepository(User::class)->find($data['approval_by']);
        if ($approval == null) {
            throw new \Exception('Not found Approval by ID');
        }
        $domesticPricing->setCarrier($carrier);
        $domesticPricing->setCategory($category);
        $domesticPricing->setService($service);
        $domesticPricing->setSaleman($saleman);
        $domesticPricing->setApprovalBy($approval);
        $domesticPricing->setUpdatedBy($user_data);
        $domesticPricing->setCreatedBy($user_data);

        //Create Name Pricing
        $name = $carrier->getNameEn() . '.' . $service->getNameEn();
        if ($data['is_private'] == 0) {
            $name .= '.Public';
        }

        if ($data['customer_id']) {
            $customer = $this->entityManager->getRepository(Customer::class)->find($data['customer_id']);
            if ($customer == null) {
                throw new \Exception('Not found Customer by ID');
            }

            $domesticPricing->setCustomer($customer);
            $name .= '.' . $customer->getName();
        } else {
            $domesticPricing->setCustomer(null);
        }

        if ($mode == 'add') {
            $name = str_replace(' ', '', $name);

            $ormPricing = $this->entityManager->getRepository(DomesticPricing::class)->getListDomesticPricingByCondition(1, 0, 'name', 'asc', [
                'name' => $name,
            ]);

            $indexPricing = 1;
            if ($ormPricing) {
                //set offset,limit
                $ormPaginator = new ORMPaginator($ormPricing, true);
                $ormPaginator->setUseOutputWalkers(false);

                $pricings = $ormPaginator->getIterator()->getArrayCopy();
                if ($pricings) {
                    $pricing = explode('.', $pricings[count($pricings) - 1]['name']);
                    $indexPricing = (int) $pricing[count($pricing) - 1] + 1;
                }
            }

            $domesticPricing->setName($name . '.' . $indexPricing);
        }
    }
}
