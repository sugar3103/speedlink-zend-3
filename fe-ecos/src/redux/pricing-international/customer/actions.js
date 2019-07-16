import {
  PRI_INT_CUSTOMER_ERROR,

  PRI_INT_CUSTOMER_GET_LIST,
  PRI_INT_CUSTOMER_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const customerInternationalError = (error) => ({
  type: PRI_INT_CUSTOMER_ERROR,
  payload: error
});

export const getCustomerInternationalList = (params) => ({
  type: PRI_INT_CUSTOMER_GET_LIST,
  payload: { params }
});

export const getCustomerInternationalListSuccess = (items) => ({
  type: PRI_INT_CUSTOMER_GET_LIST_SUCCESS,
  payload: { items }
});