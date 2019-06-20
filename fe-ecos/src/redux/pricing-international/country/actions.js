import {
  PRI_INT_COUNTRY_ERROR,

  PRI_INT_ORIGIN_COUNTRY_GET_LIST,
  PRI_INT_ORIGIN_COUNTRY_GET_LIST_SUCCESS,

  PRI_INT_DESTINATION_COUNTRY_GET_LIST,
  PRI_INT_DESTINATION_COUNTRY_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const countryInternationalError = (error) => ({
  type: PRI_INT_COUNTRY_ERROR,
  payload: error
});

export const getOriginCountryInternationalList = (params) => ({
  type: PRI_INT_ORIGIN_COUNTRY_GET_LIST,
  payload: { params }
});

export const getOriginCountryInternationalListSuccess = (items) => ({
  type: PRI_INT_ORIGIN_COUNTRY_GET_LIST_SUCCESS,
  payload: { origin: items }
});

export const getDestinationCountryInternationalList = (params) => ({
  type: PRI_INT_DESTINATION_COUNTRY_GET_LIST,
  payload: { params }
});

export const getDestinationCountryInternationalListSuccess = (items) => ({
  type: PRI_INT_DESTINATION_COUNTRY_GET_LIST_SUCCESS,
  payload: { destination: items }
});