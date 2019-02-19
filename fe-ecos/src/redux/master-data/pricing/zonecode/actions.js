import {
  ZONECODE_TOGGLE_MODAL,
  ZONECODE_GET_LIST,
  ZONECODE_GET_LIST_SUCCESS,
  ZONECODE_GET_LIST_ERROR,
  ZONECODE_ADD_ITEM,
  ZONECODE_ADD_ITEM_SUCCESS,
  ZONECODE_ADD_ITEM_ERROR,
  ZONECODE_UPDATE_ITEM,
  ZONECODE_UPDATE_ITEM_SUCCESS,
  ZONECODE_UPDATE_ITEM_ERROR,
  ZONECODE_DELETE_ITEM,
  ZONECODE_DELETE_ITEM_SUCCESS,
  ZONECODE_DELETE_ITEM_ERROR
} from '../../../../constants/actionTypes';

export const toggleZoneCodeModal = (zonecode = null) => ({
  type: ZONECODE_TOGGLE_MODAL,
  payload: zonecode
})

export const getZoneCodeList = (params, messages) => ({
  type: ZONECODE_GET_LIST,
  payload: { params, messages }
});

export const getZoneCodeListSuccess = (items, total) => ({
  type: ZONECODE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getZoneCodeListError = (error) => ({
  type: ZONECODE_GET_LIST_ERROR,
  payload: error
});

export const addZoneCodeItem = (item, messages) => ({
  type: ZONECODE_ADD_ITEM,
  payload: { item, messages }
});

export const addZoneCodeItemSuccess = () => ({
  type: ZONECODE_ADD_ITEM_SUCCESS,
});

export const addZoneCodeItemError = (error) => ({
  type: ZONECODE_ADD_ITEM_ERROR,
  payload: error
});

export const updateZoneCodeItem = (item, messages) => ({
  type: ZONECODE_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateZoneCodeItemSuccess = () => ({
  type: ZONECODE_UPDATE_ITEM_SUCCESS,
});

export const updateZoneCodeItemError = (error) => ({
  type: ZONECODE_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteZoneCodeItem = (id, messages) => ({
  type: ZONECODE_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteZoneCodeItemSuccess = () => ({
  type: ZONECODE_DELETE_ITEM_SUCCESS,
});

export const deleteZoneCodeItemError = (error) => ({
  type: ZONECODE_DELETE_ITEM_ERROR,
  payload: error
});