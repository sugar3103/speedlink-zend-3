import {
    SYSTEM_INFO,
    SYSTEM_INFO_SUCCESS
  } from '../../constants/actionTypes';
  
  export const getSystemInfo = () => ({
    type: SYSTEM_INFO
  })
  export const getSystemInfoSuccess = (items) => ({
    type: SYSTEM_INFO_SUCCESS,
    payload: items
  })