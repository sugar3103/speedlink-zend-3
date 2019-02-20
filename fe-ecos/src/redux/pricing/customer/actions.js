import {
    CUSTOMER_TOGGLE_MODAL,
    CUSTOMER_GET_LIST,
    CUSTOMER_GET_LIST_SUCCESS,
    CUSTOMER_GET_LIST_ERROR
  } from '../../../constants/actionTypes';
  
  export const toggleCustomerModal = (customer = null) => ({
    type: CUSTOMER_TOGGLE_MODAL,
    payload: customer
  });
  
  export const getCustomerList = (params) => ({
    type: CUSTOMER_GET_LIST,
    payload: { params }
  });
  
  export const getCustomerListSuccess = (items, total) => ({
    type: CUSTOMER_GET_LIST_SUCCESS,
    payload: { items, total }
  });
  
  export const getCustomerListError = (error) => ({
    type: CUSTOMER_GET_LIST_ERROR,
    payload: error
  });
  