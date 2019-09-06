import {
  PRI_SPECIAL_ZONE_ERROR,
  PRI_SPECIAL_ZONE_TOGGLE_MODAL,
  PRI_SPECIAL_ZONE_CHANGE_TYPE_MODAL,

  PRI_SPECIAL_ZONE_GET_LIST,
  PRI_SPECIAL_ZONE_GET_LIST_SUCCESS,

  PRI_SPECIAL_ZONE_ADD_ITEM,
  PRI_SPECIAL_ZONE_ADD_ITEM_SUCCESS,

  PRI_SPECIAL_ZONE_UPDATE_ITEM,
  PRI_SPECIAL_ZONE_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_ZONE_DELETE_ITEM,
  PRI_SPECIAL_ZONE_DELETE_ITEM_SUCCESS,

  PRI_SPECIAL_ZONE_UPLOAD_REQUEST,
  PRI_SPECIAL_ZONE_UPLOAD_PROGRESS,
  PRI_SPECIAL_ZONE_UPLOAD_SUCCESS,
  PRI_SPECIAL_ZONE_RESET_DATA_IMPORT,
  PRI_SPECIAL_ZONE_GET_DATA_IMPORT,
  PRI_SPECIAL_ZONE_GET_DATA_IMPORT_SUCCESS,
  PRI_SPECIAL_ZONE_SAVE_DATA_IMPORT,
  PRI_SPECIAL_ZONE_SAVE_DATA_IMPORT_SUCCESS

} from '../../../constants/actionTypes';

export const zoneSpecialError = (error) => ({
  type: PRI_SPECIAL_ZONE_ERROR,
  payload: error
});

export const toggleZoneSpecialModal = (type, data) => ({
  type: PRI_SPECIAL_ZONE_TOGGLE_MODAL,
  payload: { type, data }
});

export const changeTypeZoneSpecialModal = (type) => ({
  type: PRI_SPECIAL_ZONE_CHANGE_TYPE_MODAL,
  payload: type
})

export const getZoneSpecialList = (params) => ({
  type: PRI_SPECIAL_ZONE_GET_LIST,
  payload: { params }
});

export const getZoneSpecialListSuccess = (items, total) => ({
  type: PRI_SPECIAL_ZONE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addZoneSpecialItem = (item, pageSize) => ({
  type: PRI_SPECIAL_ZONE_ADD_ITEM,
  payload: { item, pageSize }
});

export const addZoneSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_ZONE_ADD_ITEM_SUCCESS
});

export const updateZoneSpecialItem = (item, pageSize) => ({
  type: PRI_SPECIAL_ZONE_UPDATE_ITEM,
  payload: { item, pageSize }
});

export const updateZoneSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_ZONE_UPDATE_ITEM_SUCCESS
});

export const deleteZoneSpecialItem = (ids, pageSize) => ({
  type: PRI_SPECIAL_ZONE_DELETE_ITEM,
  payload: { ids, pageSize }
});

export const deleteZoneSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_ZONE_DELETE_ITEM_SUCCESS,
});

export const uploadZoneSpecialRequest = (file) => ({
  type: PRI_SPECIAL_ZONE_UPLOAD_REQUEST,
  payload: file
});

export const uploadZoneSpecialProgress = (progress) => ({
  type: PRI_SPECIAL_ZONE_UPLOAD_PROGRESS,
  payload: progress
});

export const uploadZoneSpecialSuccess = (dataImport, totalImport) => ({
  type: PRI_SPECIAL_ZONE_UPLOAD_SUCCESS,
  payload: { dataImport, totalImport }
});

export const resetDataImportZoneSpecial = () => ({
  type: PRI_SPECIAL_ZONE_RESET_DATA_IMPORT,
});

export const getDataImportZoneSpecial = (params) => ({
  type: PRI_SPECIAL_ZONE_GET_DATA_IMPORT,
  payload: { params }
});

export const getDataImportZoneSpecialListSuccess = (dataImportGet, totalImportGet) => ({
  type: PRI_SPECIAL_ZONE_GET_DATA_IMPORT_SUCCESS,
  payload: { dataImportGet, totalImportGet }
});

export const saveDataImportZoneSpecial = () => ({
  type: PRI_SPECIAL_ZONE_SAVE_DATA_IMPORT
});

export const saveDataImportZoneSpecialSuccess = (totalImportSuccess, totalRecord) => ({
  type: PRI_SPECIAL_ZONE_SAVE_DATA_IMPORT_SUCCESS,
  payload: { totalImportSuccess, totalRecord }
});