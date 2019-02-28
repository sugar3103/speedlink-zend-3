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
import rangeweightSagas from './pricing-management/range-weight/saga';
import zonecodeSagas from './pricing-management/zone-code/saga';
import customerSagas from './pricing-management/customer/saga';
import pricingSagas from './pricing-management/pricing/saga';
import carrierSagas from './master-data/service-shipment/carrier/saga';
import serviceSagas from './master-data/service-shipment/service/saga';
import shipmentTypeSagas from './master-data/service-shipment/shipmnet-type/saga';
import userSagas from './system/users/user/saga'
import roleSagas from './system/users/role/saga';
import permissionSagas from './system/users/permission/saga';
import settingSagas from './system/setting/saga';
import systemSagas from './system/saga';

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
    rangeweightSagas(),
    zonecodeSagas(),
    customerSagas(),
    pricingSagas(),
    carrierSagas(),
    serviceSagas(),
    shipmentTypeSagas(),
    settingSagas(),
    systemSagas()
  ]);
}
