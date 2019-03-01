import {
  PRICING_COUNTRY_GET_LIST,
  PRICING_COUNTRY_GET_LIST_SUCCESS,
  PRICING_COUNTRY_GET_LIST_ERROR,
  
  PRICING_CITY_GET_LIST,
  PRICING_CITY_GET_LIST_SUCCESS,
  PRICING_CITY_GET_LIST_ERROR,

  PRICING_DISTRICT_GET_LIST,
  PRICING_DISTRICT_GET_LIST_SUCCESS,
  PRICING_DISTRICT_GET_LIST_ERROR,

  PRICING_WARD_GET_LIST,
  PRICING_WARD_GET_LIST_SUCCESS,
  PRICING_WARD_GET_LIST_ERROR,

  PRICING_SALEMAN_GET_LIST,
  PRICING_SALEMAN_GET_LIST_SUCCESS,
  PRICING_SALEMAN_GET_LIST_ERROR,

  PRICING_APPROVED_BY_GET_LIST,
  PRICING_APPROVED_BY_GET_LIST_SUCCESS,
  PRICING_APPROVED_BY_GET_LIST_ERROR,

  PRICING_GET_LIST,
  PRICING_GET_LIST_SUCCESS,
  PRICING_GET_LIST_ERROR,

  PRICING_ADD_MASTER_DATA,
  PRICING_ADD_MASTER_DATA_SUCCESS,
  PRICING_ADD_MASTER_DATA_ERROR

} from '../../../constants/actionTypes';

export const getCountryPricingList = (params, messages) => ({
  type: PRICING_COUNTRY_GET_LIST,
  payload: { params, messages }
});

export const getCountryPricingListSuccess = (countries) => ({
  type: PRICING_COUNTRY_GET_LIST_SUCCESS,
  payload: { countries }
});

export const getCountryPricingListError = (error) => ({
  type: PRICING_COUNTRY_GET_LIST_ERROR,
  payload: error
});

export const getCityPricingList = (params, messages) => ({
  type: PRICING_CITY_GET_LIST,
  payload: { params, messages }
});

export const getCityPricingListSuccess = (cities) => ({
  type: PRICING_CITY_GET_LIST_SUCCESS,
  payload: { cities }
});

export const getCityPricingListError = (error) => ({
  type: PRICING_CITY_GET_LIST_ERROR,
  payload: error
});

export const getDistrictPricingList = (params, messages) => ({
  type: PRICING_DISTRICT_GET_LIST,
  payload: { params, messages }
});

export const getDistrictPricingListSuccess = (districts) => ({
  type: PRICING_DISTRICT_GET_LIST_SUCCESS,
  payload: { districts }
});

export const getDistrictPricingListError = (error) => ({
  type: PRICING_DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const getWardPricingList = (params, messages) => ({
  type: PRICING_WARD_GET_LIST,
  payload: { params, messages }
});

export const getWardPricingListSuccess = (wards) => ({
  type: PRICING_WARD_GET_LIST_SUCCESS,
  payload: { wards }
});

export const getWardPricingListError = (error) => ({
  type: PRICING_WARD_GET_LIST_ERROR,
  payload: error
});

export const getSalemanList = (params, messages) => ({
  type: PRICING_SALEMAN_GET_LIST,
  payload: { params, messages }
});

export const getSalemanListSuccess = (salemans) => ({
  type: PRICING_SALEMAN_GET_LIST_SUCCESS,
  payload: { salemans }
});

export const getSalemanListError = (error) => ({
  type: PRICING_SALEMAN_GET_LIST_ERROR,
  payload: error
});

export const getApprovedByList = (params, messages) => ({
  type: PRICING_APPROVED_BY_GET_LIST,
  payload: { params, messages }
});

export const getApprovedByListSuccess = (approvedBys) => ({
  type: PRICING_APPROVED_BY_GET_LIST_SUCCESS,
  payload: { approvedBys }
});

export const getApprovedByListError = (error) => ({
  type: PRICING_APPROVED_BY_GET_LIST_ERROR,
  payload: error
});


export const getPricingList = (params, messages) => ({
  type: PRICING_GET_LIST,
  payload: { params, messages }
});

export const getPricingListSuccess = (items, total) => ({
  type: PRICING_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getPricingListError = (error) => ({
  type: PRICING_GET_LIST_ERROR,
  payload: error
});

export const addPricingMasterDataItem = (item, messages) => ({
  type: PRICING_ADD_MASTER_DATA,
  payload: { item, messages }
});

export const addPricingMasterDataItemSuccess = () => ({
  type: PRICING_ADD_MASTER_DATA_SUCCESS,
});

export const addPricingMasterDataItemError = (error) => ({
  type: PRICING_ADD_MASTER_DATA_ERROR,
  payload: error
});
