import {
  PRI_INT_DISTRICT_ERROR,

  PRI_INT_ORIGIN_DISTRICT_GET_LIST,
  PRI_INT_ORIGIN_DISTRICT_GET_LIST_SUCCESS,

  PRI_INT_DESTINATION_DISTRICT_GET_LIST,
  PRI_INT_DESTINATION_DISTRICT_GET_LIST_SUCCESS,

  PRI_INT_PRICING_DISTRICT_GET_LIST,
  PRI_INT_PRICING_DISTRICT_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const districtInternationalError = (error) => ({
  type: PRI_INT_DISTRICT_ERROR,
  payload: error
});

export const getOriginDistrictInternationalList = (params) => ({
  type: PRI_INT_ORIGIN_DISTRICT_GET_LIST,
  payload: { params }
});

export const getOriginDistrictInternationalListSuccess = (items) => ({
  type: PRI_INT_ORIGIN_DISTRICT_GET_LIST_SUCCESS,
  payload: { origin: items }
});

export const getDestinationDistrictInternationalList = (params) => ({
  type: PRI_INT_DESTINATION_DISTRICT_GET_LIST,
  payload: { params }
});

export const getDestinationDistrictInternationalListSuccess = (items) => ({
  type: PRI_INT_DESTINATION_DISTRICT_GET_LIST_SUCCESS,
  payload: { destination: items }
});

export const getPricingDistrictInternationalList = (params) => ({
  type: PRI_INT_PRICING_DISTRICT_GET_LIST,
  payload: { params }
});

export const getPricingDistrictInternationalListSuccess = (items) => ({
  type: PRI_INT_PRICING_DISTRICT_GET_LIST_SUCCESS,
  payload: { pricing: items }
});