import {
  PRI_DOM_SALEMAN_ERROR,

  PRI_DOM_SALEMAN_GET_LIST,
  PRI_DOM_SALEMAN_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const salemanDomesticError = (error) => ({
  type: PRI_DOM_SALEMAN_ERROR,
  payload: error
});

export const getSalemanDomesticList = (params) => ({
  type: PRI_DOM_SALEMAN_GET_LIST,
  payload: { params }
});

export const getSalemanDomesticListSuccess = (items) => ({
  type: PRI_DOM_SALEMAN_GET_LIST_SUCCESS,
  payload: { items }
});