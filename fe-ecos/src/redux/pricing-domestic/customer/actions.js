import {
  PRI_DOM_CUSTOMER_ERROR,

  PRI_DOM_CUSTOMER_GET_LIST,
  PRI_DOM_CUSTOMER_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const customerDomesticError = (error) => ({
  type: PRI_DOM_CUSTOMER_ERROR,
  payload: error
});

export const getCustomerDomesticList = (params) => ({
  type: PRI_DOM_CUSTOMER_GET_LIST,
  payload: { params }
});

export const getCustomerDomesticListSuccess = (items) => ({
  type: PRI_DOM_CUSTOMER_GET_LIST_SUCCESS,
  payload: { items }
});