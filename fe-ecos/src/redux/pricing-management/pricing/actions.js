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
} from '../../../constants/actionTypes';

export const getCountryPricingList = (params) => ({
  type: PRICING_COUNTRY_GET_LIST,
  payload: { params }
});

export const getCountryPricingListSuccess = (countries) => ({
  type: PRICING_COUNTRY_GET_LIST_SUCCESS,
  payload: { countries }
});

export const getCountryPricingListError = (error) => ({
  type: PRICING_COUNTRY_GET_LIST_ERROR,
  payload: error
});

export const getCityPricingList = (params) => ({
  type: PRICING_CITY_GET_LIST,
  payload: { params }
});

export const getCityPricingListSuccess = (cities) => ({
  type: PRICING_CITY_GET_LIST_SUCCESS,
  payload: { cities }
});

export const getCityPricingListError = (error) => ({
  type: PRICING_CITY_GET_LIST_ERROR,
  payload: error
});

export const getDistrictPricingList = (params) => ({
  type: PRICING_DISTRICT_GET_LIST,
  payload: { params }
});

export const getDistrictPricingListSuccess = (districts) => ({
  type: PRICING_DISTRICT_GET_LIST_SUCCESS,
  payload: { districts }
});

export const getDistrictPricingListError = (error) => ({
  type: PRICING_DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const getWardPricingList = (params) => ({
  type: PRICING_WARD_GET_LIST,
  payload: { params }
});

export const getWardPricingListSuccess = (wards) => ({
  type: PRICING_WARD_GET_LIST_SUCCESS,
  payload: { wards }
});

export const getWardPricingListError = (error) => ({
  type: PRICING_WARD_GET_LIST_ERROR,
  payload: error
});

export const getSalemanList = (params) => ({
  type: PRICING_SALEMAN_GET_LIST,
  payload: { params }
});

export const getSalemanListSuccess = (salemans) => ({
  type: PRICING_SALEMAN_GET_LIST_SUCCESS,
  payload: { salemans }
});

export const getSalemanListError = (error) => ({
  type: PRICING_SALEMAN_GET_LIST_ERROR,
  payload: error
});
