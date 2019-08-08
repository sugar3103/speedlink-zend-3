import {
  PRI_SPECIAL_CUSTOMER_ERROR,

  PRI_SPECIAL_CUSTOMER_GET_LIST,
  PRI_SPECIAL_CUSTOMER_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const customerSpecialError = (error) => ({
  type: PRI_SPECIAL_CUSTOMER_ERROR,
  payload: error
});

export const getCustomerSpecialList = (params) => ({
  type: PRI_SPECIAL_CUSTOMER_GET_LIST,
  payload: { params }
});

export const getCustomerSpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_CUSTOMER_GET_LIST_SUCCESS,
  payload: { items }
});