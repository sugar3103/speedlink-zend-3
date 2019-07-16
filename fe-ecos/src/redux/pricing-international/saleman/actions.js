import {
  PRI_INT_SALEMAN_ERROR,

  PRI_INT_SALEMAN_GET_LIST,
  PRI_INT_SALEMAN_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const salemanInternationalError = (error) => ({
  type: PRI_INT_SALEMAN_ERROR,
  payload: error
});

export const getSalemanInternationalList = (params) => ({
  type: PRI_INT_SALEMAN_GET_LIST,
  payload: { params }
});

export const getSalemanInternationalListSuccess = (items) => ({
  type: PRI_INT_SALEMAN_GET_LIST_SUCCESS,
  payload: { items }
});