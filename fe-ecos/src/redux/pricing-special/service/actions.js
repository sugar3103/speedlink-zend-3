import {
  PRI_SPECIAL_SERVICE_ERROR,

  PRI_SPECIAL_SERVICE_GET_LIST,
  PRI_SPECIAL_SERVICE_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const serviceSpecialError = (error) => ({
  type: PRI_SPECIAL_SERVICE_ERROR,
  payload: error
});

export const getServiceSpecialList = (params) => ({
  type: PRI_SPECIAL_SERVICE_GET_LIST,
  payload: { params }
});

export const getServiceSpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_SERVICE_GET_LIST_SUCCESS,
  payload: { items }
});