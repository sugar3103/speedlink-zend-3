import {
  PRI_INT_CITY_ERROR,

  PRI_INT_ORIGIN_CITY_GET_LIST,
  PRI_INT_ORIGIN_CITY_GET_LIST_SUCCESS,

  PRI_INT_DESTINATION_CITY_GET_LIST,
  PRI_INT_DESTINATION_CITY_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const cityInternationalError = (error) => ({
  type: PRI_INT_CITY_ERROR,
  payload: error
});

export const getOriginCityInternationalList = (params) => ({
  type: PRI_INT_ORIGIN_CITY_GET_LIST,
  payload: { params }
});

export const getOriginCityInternationalListSuccess = (items) => ({
  type: PRI_INT_ORIGIN_CITY_GET_LIST_SUCCESS,
  payload: { origin: items }
});

export const getDestinationCityInternationalList = (params) => ({
  type: PRI_INT_DESTINATION_CITY_GET_LIST,
  payload: { params }
});

export const getDestinationCityInternationalListSuccess = (items) => ({
  type: PRI_INT_DESTINATION_CITY_GET_LIST_SUCCESS,
  payload: { destination: items }
});