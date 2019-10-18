import {
  PRI_SPECIAL_DISTRICT_ERROR,

  PRI_SPECIAL_DESTINATION_DISTRICT_GET_LIST,
  PRI_SPECIAL_DESTINATION_DISTRICT_GET_LIST_SUCCESS,

  PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_GET_LIST,
  PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const districtSpecialError = (error) => ({
  type: PRI_SPECIAL_DISTRICT_ERROR,
  payload: error
});

export const getDestinationDistrictSpecialList = (params) => ({
  type: PRI_SPECIAL_DESTINATION_DISTRICT_GET_LIST,
  payload: { params }
});

export const getDestinationDistrictSpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_DESTINATION_DISTRICT_GET_LIST_SUCCESS,
  payload: { destination: items }
});

export const getDestinationDistrictCreateSpecialList = (params) => ({
  type: PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_GET_LIST,
  payload: { params }
});

export const getDestinationDistrictCreateSpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_GET_LIST_SUCCESS,
  payload: { destinationCreate: items }
});