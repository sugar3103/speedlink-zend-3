import {
  CUSTOMER_TOGGLE_MODAL,
  CUSTOMER_GET_LIST,
  CUSTOMER_GET_LIST_SUCCESS,
  CUSTOMER_GET_LIST_ERROR,
  CUSTOMER_ADD_ITEM,
  CUSTOMER_ADD_ITEM_SUCCESS,
  CUSTOMER_ADD_ITEM_ERROR,
  CUSTOMER_UPDATE_ITEM,
  CUSTOMER_UPDATE_ITEM_SUCCESS,
  CUSTOMER_UPDATE_ITEM_ERROR,
  CUSTOMER_DELETE_ITEM,
  CUSTOMER_DELETE_ITEM_SUCCESS,
  CUSTOMER_DELETE_ITEM_ERROR,
  CUSTOMER_CHANGE_TYPE_MODAL
} from '../../../constants/actionTypes';

export const toggleCustomerModal = (type, data) => ({
  type: CUSTOMER_TOGGLE_MODAL,
  payload: { type, data }
})

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

export const addCustomerItem = (item) => ({
  type: CUSTOMER_ADD_ITEM,
  payload: { item }
});

export const addCustomerItemSuccess = () => ({
  type: CUSTOMER_ADD_ITEM_SUCCESS,
});

export const addCustomerItemError = (error) => ({
  type: CUSTOMER_ADD_ITEM_ERROR,
  payload: error
});

export const updateCustomerItem = (item) => ({
  type: CUSTOMER_UPDATE_ITEM,
  payload: { item }
});

export const updateCustomerItemSuccess = () => ({
  type: CUSTOMER_UPDATE_ITEM_SUCCESS,
});

export const updateCustomerItemError = (error) => ({
  type: CUSTOMER_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteCustomerItem = (ids) => ({
  type: CUSTOMER_DELETE_ITEM,
  payload: { ids }
});

export const deleteCustomerItemSuccess = () => ({
  type: CUSTOMER_DELETE_ITEM_SUCCESS,
});

export const deleteCustomerItemError = (error) => ({
  type: CUSTOMER_DELETE_ITEM_ERROR,
  payload: error
});

export const changeTypeCustomerModal = (type) => ({
  type: CUSTOMER_CHANGE_TYPE_MODAL,
  payload: type
})