import {
  PRI_INT_SERVICE_ERROR,

  PRI_INT_SERVICE_GET_LIST,
  PRI_INT_SERVICE_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const serviceInternationalError = (error) => ({
  type: PRI_INT_SERVICE_ERROR,
  payload: error
});

export const getServiceInternationalList = (params) => ({
  type: PRI_INT_SERVICE_GET_LIST,
  payload: { params }
});

export const getServiceInternationalListSuccess = (items) => ({
  type: PRI_INT_SERVICE_GET_LIST_SUCCESS,
  payload: { items }
});