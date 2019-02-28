import {
  SHIPMENT_TYPE_TOGGLE_MODAL,
  SHIPMENT_TYPE_GET_LIST,
  SHIPMENT_TYPE_GET_LIST_SUCCESS,
  SHIPMENT_TYPE_GET_LIST_ERROR,
  SHIPMENT_TYPE_ADD_ITEM,
  SHIPMENT_TYPE_ADD_ITEM_SUCCESS,
  SHIPMENT_TYPE_ADD_ITEM_ERROR,
  SHIPMENT_TYPE_UPDATE_ITEM,
  SHIPMENT_TYPE_UPDATE_ITEM_SUCCESS,
  SHIPMENT_TYPE_UPDATE_ITEM_ERROR,
  SHIPMENT_TYPE_DELETE_ITEM,
  SHIPMENT_TYPE_DELETE_ITEM_SUCCESS,
  SHIPMENT_TYPE_DELETE_ITEM_ERROR,
  SHIPMENT_TYPE_CODE_GET_LIST,
  SHIPMENT_TYPE_CODE_GET_LIST_SUCCESS,
  SHIPMENT_TYPE_CODE_GET_LIST_ERROR,

  CARRIER_GET_CODE_BY_CONDITION, 
  CARRIER_GET_CODE_BY_CONDITION_SUCCESS,
  CARRIER_GET_CODE_BY_CONDITION_ERROR, 

  SERVICE_GET_CODE_BY_CONDITION, 
  SERVICE_GET_CODE_BY_CONDITION_SUCCESS, 
  SERVICE_GET_CODE_BY_CONDITION_ERROR,

  SHIPMENT_TYPE_GET_CODE_BY_CONDITION,
  SHIPMENT_TYPE_GET_CODE_BY_CONDITION_SUCCESS,
  SHIPMENT_TYPE_GET_CODE_BY_CONDITION_ERROR
} from '../../../../constants/actionTypes';

export const toggleShipmentTypeModal = (shipment_type = null) => ({
  type: SHIPMENT_TYPE_TOGGLE_MODAL,
  payload: shipment_type
});

export const getShipmentTypeList = (params) => ({
  type: SHIPMENT_TYPE_GET_LIST,
  payload: { params }
});

export const getShipmentTypeListSuccess = (items, total) => ({
  type: SHIPMENT_TYPE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getShipmentTypeListError = (error) => ({
  type: SHIPMENT_TYPE_GET_LIST_ERROR,
  payload: error
});

export const getShipmentTypeCodeList = () => ({
  type: SHIPMENT_TYPE_CODE_GET_LIST,
  payload: { }
});

export const getShipmentTypeCodeListSuccess = (codes) => ({
  type: SHIPMENT_TYPE_CODE_GET_LIST_SUCCESS,
  payload: { codes }
});

export const getShipmentTypeCodeListError = (error) => ({
  type: SHIPMENT_TYPE_CODE_GET_LIST_ERROR,
  payload: error
});

export const addShipmentTypeItem = (item, messages) => ({
  type: SHIPMENT_TYPE_ADD_ITEM,
  payload: { item, messages }
});

export const addShipmentTypeItemSuccess = () => ({
  type: SHIPMENT_TYPE_ADD_ITEM_SUCCESS,
});

export const addShipmentTypeItemError = (error) => ({
  type: SHIPMENT_TYPE_ADD_ITEM_ERROR,
  payload: error
});

export const updateShipmentTypeItem = (item, messages) => ({
  type: SHIPMENT_TYPE_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateShipmentTypeItemSuccess = () => ({
  type: SHIPMENT_TYPE_UPDATE_ITEM_SUCCESS,
});

export const updateShipmentTypeItemError = (error) => ({
  type: SHIPMENT_TYPE_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteShipmentTypeItem = (id, messages) => ({
  type: SHIPMENT_TYPE_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteShipmentTypeItemSuccess = () => ({
  type: SHIPMENT_TYPE_DELETE_ITEM_SUCCESS,
});

export const deleteShipmentTypeItemError = (error) => ({
  type: SHIPMENT_TYPE_DELETE_ITEM_ERROR,
  payload: error
});


export const getCarrierCodeByCondition = (params, messages) => ({
  type: CARRIER_GET_CODE_BY_CONDITION,
  payload: { params, messages }
});

export const getCarrierCodeByConditionSuccess = ( CarrierCodeByCondition) => ({
  type: CARRIER_GET_CODE_BY_CONDITION_SUCCESS,
  payload: { CarrierCodeByCondition }
});

export const getCarrierCodeByConditionError = (error) => ({
  type: CARRIER_GET_CODE_BY_CONDITION_ERROR,
  payload: error
});

export const getServiceCodeByCondition = (params, messages) => ({
  type: SERVICE_GET_CODE_BY_CONDITION,
  payload: { params, messages }
});

export const getServiceCodeByConditionSuccess = (ServiceCodeByCondition) => ({
  type: SERVICE_GET_CODE_BY_CONDITION_SUCCESS,
  payload: { ServiceCodeByCondition }
});

export const getServiceCodeByConditionError = (error) => ({
  type: SERVICE_GET_CODE_BY_CONDITION_ERROR,
  payload: error
});

export const getShipmentTypeCodeByCondition = (params, messages) => ({
  type: SHIPMENT_TYPE_GET_CODE_BY_CONDITION,
  payload: { params, messages }
});

export const getShipmentTypeCodeByConditionSuccess = (codeByCondition) => ({
  type: SHIPMENT_TYPE_GET_CODE_BY_CONDITION_SUCCESS,
  payload: { codeByCondition }
});

export const getShipmentTypeCodeByConditionError = (error) => ({
  type: SHIPMENT_TYPE_GET_CODE_BY_CONDITION_ERROR,
  payload: error
});
