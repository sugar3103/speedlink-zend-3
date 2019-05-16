export * from './settings/actions';
export * from './auth/actions';
export * from './master-data/status/actions';
export * from './master-data/hub/actions';
export * from './master-data/branch/actions';
export * from './master-data/address/code/actions';
export * from './master-data/address/country/actions';
export * from './master-data/address/city/actions';
export * from './master-data/address/district/actions';
export * from './master-data/address/ward/actions';
export * from './pricing-domestic/area/actions';
export * from './pricing-domestic/range-weight/actions';
export * from './pricing-domestic/zone/actions';
export * from './pricing-domestic/carrier/actions';
export * from './pricing-domestic/service/actions';
export * from './pricing-domestic/shipment-type/actions';
export * from './pricing-management/range-weight/actions';
export * from './pricing-management/zone-code/actions';
export * from './pricing-management/customer/actions';
export * from './pricing-management/pricing/actions';
export * from './master-data/service-shipment/carrier/actions';
export * from './master-data/service-shipment/service/actions';
export * from './master-data/service-shipment/shipmnet-type/actions';
export * from './system/users/permission/actions';
export * from './system/users/role/actions';
export * from './system/users/user/actions';
export * from './system/setting/action';
export * from './system/action';

export const removeState = type => ({
   type: type
});