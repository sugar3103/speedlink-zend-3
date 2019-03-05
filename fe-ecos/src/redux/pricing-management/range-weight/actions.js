import {
    RANGE_WEIGHT_TOGGLE_MODAL,
    RANGE_WEIGHT_GET_LIST,
    RANGE_WEIGHT_GET_LIST_SUCCESS,
    RANGE_WEIGHT_GET_LIST_ERROR,
    RANGE_WEIGHT_ADD_ITEM,
    RANGE_WEIGHT_ADD_ITEM_SUCCESS,
    RANGE_WEIGHT_ADD_ITEM_ERROR,
    RANGE_WEIGHT_UPDATE_ITEM,
    RANGE_WEIGHT_UPDATE_ITEM_SUCCESS,
    RANGE_WEIGHT_UPDATE_ITEM_ERROR,
    RANGE_WEIGHT_DELETE_ITEM,
    RANGE_WEIGHT_DELETE_ITEM_SUCCESS,
    RANGE_WEIGHT_DELETE_ITEM_ERROR,
    RANGE_WEIGHT_CHANGE_TYPE_MODAL,
    CARRIER_GET_CODE_BY_CONDITION, 
    CARRIER_GET_CODE_BY_CONDITION_SUCCESS,
    CARRIER_GET_CODE_BY_CONDITION_ERROR, 
  
    SERVICE_GET_CODE_BY_CONDITION, 
    SERVICE_GET_CODE_BY_CONDITION_SUCCESS, 
    SERVICE_GET_CODE_BY_CONDITION_ERROR,
  
    SHIPMENT_TYPE_GET_CODE_BY_CONDITION,
    SHIPMENT_TYPE_GET_CODE_BY_CONDITION_SUCCESS,
    SHIPMENT_TYPE_GET_CODE_BY_CONDITION_ERROR
  } from '../../../constants/actionTypes';
  
  export const toggleRangeWeightModal = (type, data) => ({
    type: RANGE_WEIGHT_TOGGLE_MODAL,
    payload: { type, data }
  });

  export const changeTypeRangeWeightModal = (type) => ({
    type: RANGE_WEIGHT_CHANGE_TYPE_MODAL,
    payload: type
  })
  
  export const getRangeWeightList = (params) => ({
    type: RANGE_WEIGHT_GET_LIST,
    payload: { params }
  });
  
  export const getRangeWeightListSuccess = (items, total) => ({
    type: RANGE_WEIGHT_GET_LIST_SUCCESS,
    payload: { items, total }
  });
  
  export const getRangeWeightListError = (error) => ({
    type: RANGE_WEIGHT_GET_LIST_ERROR,
    payload: error
  });
  
  export const addRangeWeightItem = (item, messages) => ({
    type: RANGE_WEIGHT_ADD_ITEM,
    payload: { item, messages }
  });
  
  export const addRangeWeightItemSuccess = () => ({
    type: RANGE_WEIGHT_ADD_ITEM_SUCCESS,
  });
  
  export const addRangeWeightItemError = (error) => ({
    type: RANGE_WEIGHT_ADD_ITEM_ERROR,
    payload: error
  });
  
  export const updateRangeWeightItem = (item, messages) => ({
    type: RANGE_WEIGHT_UPDATE_ITEM,
    payload: { item, messages }
  });
  
  export const updateRangeWeightItemSuccess = () => ({
    type: RANGE_WEIGHT_UPDATE_ITEM_SUCCESS,
  });
  
  export const updateRangeWeightItemError = (error) => ({
    type: RANGE_WEIGHT_UPDATE_ITEM_ERROR,
    payload: error
  });
  
  export const deleteRangeWeightItem = (ids, messages) => ({
    type: RANGE_WEIGHT_DELETE_ITEM,
    payload: { ids, messages }
  });
  
  export const deleteRangeWeightItemSuccess = () => ({
    type: RANGE_WEIGHT_DELETE_ITEM_SUCCESS,
  });
  
  export const deleteRangeWeightItemError = (error) => ({
    type: RANGE_WEIGHT_DELETE_ITEM_ERROR,
    payload: error
  });

  export const getCarrierCodeByCondition = (params, messages, types) => ({
    type: CARRIER_GET_CODE_BY_CONDITION,
    payload: { params, messages, types }
  });
  
  export const getCarrierCodeByConditionSuccess = ( CarrierCodeByCondition) => ({
    type: CARRIER_GET_CODE_BY_CONDITION_SUCCESS,
    payload: { CarrierCodeByCondition }
  });
  
  export const getCarrierCodeByConditionError = (error) => ({
    type: CARRIER_GET_CODE_BY_CONDITION_ERROR,
    payload: error
  });
  
  export const getServiceCodeByCondition = (params, messages, types) => ({
    type: SERVICE_GET_CODE_BY_CONDITION,
    payload: { params, messages, types }
  });
  
  export const getServiceCodeByConditionSuccess = (ServiceCodeByCondition) => ({
    type: SERVICE_GET_CODE_BY_CONDITION_SUCCESS,
    payload: { ServiceCodeByCondition }
  });
  
  export const getServiceCodeByConditionError = (error) => ({
    type: SERVICE_GET_CODE_BY_CONDITION_ERROR,
    payload: error
  });
  
  export const getShipmentTypeCodeByCondition = (params, messages, types) => ({
    type: SHIPMENT_TYPE_GET_CODE_BY_CONDITION,
    payload: { params, messages, types }
  });
  
  export const getShipmentTypeCodeByConditionSuccess = (ShipmentCodeByCondition) => ({
    type: SHIPMENT_TYPE_GET_CODE_BY_CONDITION_SUCCESS,
    payload: { ShipmentCodeByCondition }
  });
  
  export const getShipmentTypeCodeByConditionError = (error) => ({
    type: SHIPMENT_TYPE_GET_CODE_BY_CONDITION_ERROR,
    payload: error
  });