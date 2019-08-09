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
export * from './master-data/service-shipment/carrier/actions';
export * from './master-data/service-shipment/service/actions';
export * from './master-data/service-shipment/shipmnet-type/actions';

export * from './system/users/permission/actions';
export * from './system/users/role/actions';
export * from './system/users/user/actions';
export * from './system/setting/action';
export * from './system/action';

export * from './pricing-domestic/pricing/actions';
export * from './pricing-domestic/area/actions';
export * from './pricing-domestic/range-weight/actions';
export * from './pricing-domestic/zone/actions';
export * from './pricing-domestic/carrier/actions';
export * from './pricing-domestic/service/actions';
export * from './pricing-domestic/shipment-type/actions';
export * from './pricing-domestic/customer/actions';
export * from './pricing-domestic/approved-by/actions';
export * from './pricing-domestic/saleman/actions';

export * from './pricing-special/area/actions';
export * from './pricing-special/zone/actions';
export * from './pricing-special/customer/actions';
export * from './pricing-special/city/actions';
export * from './pricing-special/district/actions';
export * from './pricing-special/ward/actions';
export * from './pricing-special/import/actions';

export * from './pricing-international/pricing/actions';
export * from './pricing-international/country/actions';
export * from './pricing-international/city/actions';
export * from './pricing-international/district/actions';
export * from './pricing-international/ward/actions';
export * from './pricing-international/range-weight/actions';
export * from './pricing-international/carrier/actions';
export * from './pricing-international/service/actions';
export * from './pricing-international/shipment-type/actions';
export * from './pricing-international/customer/actions';
export * from './pricing-international/zone/actions';
export * from './pricing-international/approved-by/actions';
export * from './pricing-international/saleman/actions';


export const removeState = type => ({
   type: type
});