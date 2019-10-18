import {
    GET_SETTING,
    GET_SETTING_SUCCESS,
    GET_SETTING_ERROR,
    UPDATE_SETTING_SUCCESS,
    UPDATE_SETTING_ERROR,
    UPDATE_SETTING,
  } from '../../../constants/actionTypes';
  
  export const getSetting = (params) => ({
    type: GET_SETTING,
    payload: { params }
  });
  
  export const getSettingSuccess = (items) => ({
    type: GET_SETTING_SUCCESS,
    payload: {items}
  });
  
  export const getSettingError = (error) => ({
    type: GET_SETTING_ERROR,
    payload: error
  });

  export const updateSetting = (item) => ({
    type: UPDATE_SETTING,
    payload: { item }
  });
  
  export const updateSettingSuccess = () => ({
    type: UPDATE_SETTING_SUCCESS,
  });
  
  export const updateSettingError = (error) => ({
    type: UPDATE_SETTING_ERROR,
    payload: error
  });
