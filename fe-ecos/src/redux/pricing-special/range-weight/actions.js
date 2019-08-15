import {
  PRI_SPECIAL_RANGE_WEIGHT_ERROR,

  PRI_SPECIAL_RANGE_WEIGHT_GET_LIST,
  PRI_SPECIAL_RANGE_WEIGHT_GET_LIST_SUCCESS,

  PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM_SUCCESS,

  PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM_SUCCESS,

  PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_REQUEST,
  PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_PROGRESS,
  PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_SUCCESS,
} from '../../../constants/actionTypes';

export const rangeWeightSpecialError = (error) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_ERROR,
  payload: error
});

export const getRangeWeightSpecialList = (params) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_GET_LIST,
  payload: { params }
});

export const getRangeWeightSpecialListSuccess = (items, total) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addRangeWeightSpecialItem = (item) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM,
  payload: { item }
});

export const addRangeWeightSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM_SUCCESS
});

export const requestUpdateRangeWeightSpecialItem = (param) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  payload: { param }
});

export const requestUpdateRangeWeightSpecialItemSuccess = (data) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM_SUCCESS,
  payload: data
})

export const updateRangeWeightSpecialItem = (item) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM,
  payload: { item }
});

export const updateRangeWeightSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM_SUCCESS
});

export const deleteRangeWeightSpecialItem = (ids) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM,
  payload: { ids }
});

export const deleteRangeWeightSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM_SUCCESS,
});

export const uploadRangeWeightSpecialRequest = (file) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_REQUEST,
  payload: file
});

export const uploadRangeWeightSpecialProgress = (progress) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_PROGRESS,
  payload: progress
});

export const uploadRangeWeightSpecialSuccess = (dataImport, totalImport) => ({
  type: PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_SUCCESS,
  payload: { dataImport, totalImport }
});