import {
    SYSTEM_GET_LIST,
    SYSTEM_GET_LIST_SUCCESS,
    SYSTEM_GET_LIST_ERROR,
  } from '../../../../constants/actionTypes';
  
  export const getSystemList = (params, messages) => ({
    type: SYSTEM_GET_LIST,
    payload: { params, messages }
  });
  
  export const getSystemListSuccess = (items) => ({
    type: SYSTEM_GET_LIST_SUCCESS,
    payload: items
  });
  
  export const getSystemListError = (error) => ({
    type: SYSTEM_GET_LIST_ERROR,
    payload: error
  });