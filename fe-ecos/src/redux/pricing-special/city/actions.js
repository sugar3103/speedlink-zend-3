import {
  PRI_SPECIAL_CITY_ERROR,

  PRI_SPECIAL_ORIGIN_CITY_GET_LIST,
  PRI_SPECIAL_ORIGIN_CITY_GET_LIST_SUCCESS,

  PRI_SPECIAL_DESTINATION_CITY_GET_LIST,
  PRI_SPECIAL_DESTINATION_CITY_GET_LIST_SUCCESS

} from '../../../constants/actionTypes';

export const citySpecialError = (error) => ({
  type: PRI_SPECIAL_CITY_ERROR,
  payload: error
});

export const getOriginCitySpecialList = (params) => ({
  type: PRI_SPECIAL_ORIGIN_CITY_GET_LIST,
  payload: { params }
});

export const getOriginCitySpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_ORIGIN_CITY_GET_LIST_SUCCESS,
  payload: { origin: items }
});

export const getDestinationCitySpecialList = (params) => ({
  type: PRI_SPECIAL_DESTINATION_CITY_GET_LIST,
  payload: { params }
});

export const getDestinationCitySpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_DESTINATION_CITY_GET_LIST_SUCCESS,
  payload: { destination: items }
});