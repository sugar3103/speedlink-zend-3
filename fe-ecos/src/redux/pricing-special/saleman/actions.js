import {
  PRI_SPECIAL_SALEMAN_ERROR,

  PRI_SPECIAL_SALEMAN_GET_LIST,
  PRI_SPECIAL_SALEMAN_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const salemanSpecialError = (error) => ({
  type: PRI_SPECIAL_SALEMAN_ERROR,
  payload: error
});

export const getSalemanSpecialList = (params) => ({
  type: PRI_SPECIAL_SALEMAN_GET_LIST,
  payload: { params }
});

export const getSalemanSpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_SALEMAN_GET_LIST_SUCCESS,
  payload: { items }
});