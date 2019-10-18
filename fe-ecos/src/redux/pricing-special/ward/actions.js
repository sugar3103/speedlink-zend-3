import {
  PRI_SPECIAL_WARD_ERROR,

  PRI_SPECIAL_DESTINATION_WARD_GET_LIST,
  PRI_SPECIAL_DESTINATION_WARD_GET_LIST_SUCCESS,

  PRI_SPECIAL_DESTINATION_WARD_CREATE_GET_LIST,
  PRI_SPECIAL_DESTINATION_WARD_CREATE_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const wardSpecialError = (error) => ({
  type: PRI_SPECIAL_WARD_ERROR,
  payload: error
});

export const getDestinationWardSpecialList = (params) => ({
  type: PRI_SPECIAL_DESTINATION_WARD_GET_LIST,
  payload: { params }
});

export const getDestinationWardSpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_DESTINATION_WARD_GET_LIST_SUCCESS,
  payload: { destination: items }
});

export const getDestinationWardCreateSpecialList = (params) => ({
  type: PRI_SPECIAL_DESTINATION_WARD_CREATE_GET_LIST,
  payload: { params }
});

export const getDestinationWardCreateSpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_DESTINATION_WARD_CREATE_GET_LIST_SUCCESS,
  payload: { destinationCreate: items }
});