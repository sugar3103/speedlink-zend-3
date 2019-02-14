import {
  CARRIER_TOGGLE_MODAL,
  CARRIER_GET_LIST,
  CARRIER_GET_LIST_SUCCESS,
  CARRIER_GET_LIST_ERROR,
  CARRIER_ADD_ITEM,
  CARRIER_ADD_ITEM_SUCCESS,
  CARRIER_ADD_ITEM_ERROR,
  CARRIER_UPDATE_ITEM,
  CARRIER_UPDATE_ITEM_SUCCESS,
  CARRIER_UPDATE_ITEM_ERROR,
  CARRIER_DELETE_ITEM,
  CARRIER_DELETE_ITEM_SUCCESS,
  CARRIER_DELETE_ITEM_ERROR,
  CARRIER_CODE_GET_LIST,
  CARRIER_CODE_GET_LIST_SUCCESS,
  CARRIER_CODE_GET_LIST_ERROR
} from '../../../../constants/actionTypes';

export const toggleCarrierModal = (carrier = null) => ({
  type: CARRIER_TOGGLE_MODAL,
  payload: carrier
});

export const getCarrierList = (params) => ({
  type: CARRIER_GET_LIST,
  payload: { params }
});

export const getCarrierListSuccess = (items, total) => ({
  type: CARRIER_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getCarrierListError = (error) => ({
  type: CARRIER_GET_LIST_ERROR,
  payload: error
});

export const getCarrierCodeList = () => ({
  type: CARRIER_CODE_GET_LIST,
  payload: { }
});

export const getCarrierCodeListSuccess = (codes) => ({
  type: CARRIER_CODE_GET_LIST_SUCCESS,
  payload: { codes }
});

export const getCarrierCodeListError = (error) => ({
  type: CARRIER_CODE_GET_LIST_ERROR,
  payload: error
});

export const addCarrierItem = (item, messages) => ({
  type: CARRIER_ADD_ITEM,
  payload: { item, messages }
});

export const addCarrierItemSuccess = () => ({
  type: CARRIER_ADD_ITEM_SUCCESS,
});

export const addCarrierItemError = (error) => ({
  type: CARRIER_ADD_ITEM_ERROR,
  payload: error
});

export const updateCarrierItem = (item, messages) => ({
  type: CARRIER_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateCarrierItemSuccess = () => ({
  type: CARRIER_UPDATE_ITEM_SUCCESS,
});

export const updateCarrierItemError = (error) => ({
  type: CARRIER_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteCarrierItem = (id, messages) => ({
  type: CARRIER_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteCarrierItemSuccess = () => ({
  type: CARRIER_DELETE_ITEM_SUCCESS,
});

export const deleteCarrierItemError = (error) => ({
  type: CARRIER_DELETE_ITEM_ERROR,
  payload: error
});