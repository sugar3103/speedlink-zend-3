import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import statusSagas from './master-data/status/saga';
import hubSagas from './master-data/hub/saga';
import branchSagas from './master-data/branch/saga';
import codeSagas from './master-data/address/code/saga';
import countrySagas from './master-data/address/country/saga';
import citySagas from './master-data/address/city/saga';
import districtSagas from './master-data/address/district/saga';
import wardSagas from './master-data/address/ward/saga';
import carrierSagas from './master-data/service-shipment/carrier/saga';
import serviceSagas from './master-data/service-shipment/service/saga';
import shipmentTypeSagas from './master-data/service-shipment/shipmnet-type/saga';
import userSagas from './system/users/user/saga'
import roleSagas from './system/users/role/saga';
import permissionSagas from './system/users/permission/saga';
import settingSagas from './system/setting/saga';
import systemSagas from './system/saga';

import pricingDomestic from './pricing-domestic/pricing/saga';
import pricingDomesticArea from './pricing-domestic/area/saga';
import pricingDomesticZone from './pricing-domestic/zone/saga';
import pricingDomesticRangeWeight from './pricing-domestic/range-weight/saga';
import pricingDomesticCarrier from './pricing-domestic/carrier/saga';
import pricingDomesticService from './pricing-domestic/service/saga';
import pricingDomesticShipmentType from './pricing-domestic/shipment-type/saga';
import pricingDomesticCustomer from './pricing-domestic/customer/saga';
import pricingDomesticApprovedBy from './pricing-domestic/approved-by/saga';
import pricingDomesticSaleman from './pricing-domestic/saleman/saga';

import pricingSpecial from './pricing-special/pricing/saga';
import pricingSpecialArea from './pricing-special/area/saga';
import pricingSpecialZone from './pricing-special/zone/saga';
import pricingSpecialRangeWeight from './pricing-special/range-weight/saga';
import pricingSpecialCustomer from './pricing-special/customer/saga';
import pricingSpecialApprovedBy from './pricing-special/approved-by/saga';
import pricingSpecialSaleman from './pricing-special/saleman/saga';
import pricingSpecialCarrier from './pricing-special/carrier/saga';
import pricingSpecialService from './pricing-special/service/saga';
import pricingSpecialShipmentType from './pricing-special/shipment-type/saga';
import pricingSpecialCity from './pricing-special/city/saga';
import pricingSpecialDistrict from './pricing-special/district/saga';
import pricingSpecialWard from './pricing-special/ward/saga';

import pricingInternational from './pricing-international/pricing/saga';
import pricingInternationalZone from './pricing-international/zone/saga';
import pricingInternationalRangeWeight from './pricing-international/range-weight/saga';
import pricingInternationalCarrier from './pricing-international/carrier/saga';
import pricingInternationalService from './pricing-international/service/saga';
import pricingInternationalShipmentType from './pricing-international/shipment-type/saga';
import pricingInternationalCustomer from './pricing-international/customer/saga';
import pricingInternationalCountry from './pricing-international/country/saga';
import pricingInternationalCity from './pricing-international/city/saga';
import pricingInternationalDistrict from './pricing-international/district/saga';
import pricingInternationalWard from './pricing-international/ward/saga';
import pricingInternationalApprovedBy from './pricing-international/approved-by/saga';
import pricingInternationalSaleman from './pricing-international/saleman/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    statusSagas(),
    hubSagas(),
    branchSagas(),
    codeSagas(),
    countrySagas(),
    citySagas(),
    districtSagas(),
    wardSagas(),
    userSagas(),
    roleSagas(),
    permissionSagas(),
    carrierSagas(),
    serviceSagas(),
    shipmentTypeSagas(),
    settingSagas(),
    systemSagas(),

    pricingDomestic(),
    pricingDomesticArea(),
    pricingDomesticZone(),
    pricingDomesticRangeWeight(),
    pricingDomesticCarrier(),
    pricingDomesticService(),
    pricingDomesticShipmentType(),
    pricingDomesticCustomer(),
    pricingDomesticApprovedBy(),
    pricingDomesticSaleman(),

    pricingSpecial(),
    pricingSpecialArea(),
    pricingSpecialZone(),
    pricingSpecialRangeWeight(),
    pricingSpecialCustomer(),
    pricingSpecialApprovedBy(),
    pricingSpecialSaleman(),
    pricingSpecialCarrier(),
    pricingSpecialService(),
    pricingSpecialShipmentType(),
    pricingSpecialCity(),
    pricingSpecialDistrict(),
    pricingSpecialWard(),

    pricingInternational(),
    pricingInternationalZone(),
    pricingInternationalRangeWeight(),
    pricingInternationalCarrier(),
    pricingInternationalService(),
    pricingInternationalShipmentType(),
    pricingInternationalCustomer(),
    pricingInternationalCountry(),
    pricingInternationalCity(),
    pricingInternationalDistrict(),
    pricingInternationalWard(),
    pricingInternationalApprovedBy(),
    pricingInternationalSaleman(),
  ]);
}
