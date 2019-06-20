import {
  PRI_INT_WARD_ERROR,

  PRI_INT_ORIGIN_WARD_GET_LIST,
  PRI_INT_ORIGIN_WARD_GET_LIST_SUCCESS,

  PRI_INT_DESTINATION_WARD_GET_LIST,
  PRI_INT_DESTINATION_WARD_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const wardInternationalError = (error) => ({
  type: PRI_INT_WARD_ERROR,
  payload: error
});

export const getOriginWardInternationalList = (params) => ({
  type: PRI_INT_ORIGIN_WARD_GET_LIST,
  payload: { params }
});

export const getOriginWardInternationalListSuccess = (items) => ({
  type: PRI_INT_ORIGIN_WARD_GET_LIST_SUCCESS,
  payload: { origin: items }
});

export const getDestinationWardInternationalList = (params) => ({
  type: PRI_INT_DESTINATION_WARD_GET_LIST,
  payload: { params }
});

export const getDestinationWardInternationalListSuccess = (items) => ({
  type: PRI_INT_DESTINATION_WARD_GET_LIST_SUCCESS,
  payload: { destination: items }
});