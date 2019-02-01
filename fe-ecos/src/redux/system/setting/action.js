import {
    SETTING_GET,
    SETTING_GET_SUCCESS,
    SETTING_GET_ERROR,
  } from '../../../constants/actionTypes';
  
  export const getSetting = (params, messages) => ({
    type: SETTING_GET,
    payload: { params, messages }
  });
  
  export const getSettingSuccess = (items) => ({
    type: SETTING_GET_SUCCESS,
    payload: {items}
  });
  
  export const getSettingError = (error) => ({
    type: SETTING_GET_ERROR,
    payload: error
  });