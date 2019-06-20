import {
  PRI_INT_RANGE_WEIGHT_ERROR,

  PRI_INT_RANGE_WEIGHT_GET_LIST,
  PRI_INT_RANGE_WEIGHT_GET_LIST_SUCCESS,

  PRI_INT_RANGE_WEIGHT_ADD_ITEM,
  PRI_INT_RANGE_WEIGHT_ADD_ITEM_SUCCESS,

  PRI_INT_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  PRI_INT_RANGE_WEIGHT_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_INT_RANGE_WEIGHT_UPDATE_ITEM,
  PRI_INT_RANGE_WEIGHT_UPDATE_ITEM_SUCCESS,

  PRI_INT_RANGE_WEIGHT_DELETE_ITEM,
  PRI_INT_RANGE_WEIGHT_DELETE_ITEM_SUCCESS,
} from '../../../constants/actionTypes';

export const rangeWeightInternationalError = (error) => ({
  type: PRI_INT_RANGE_WEIGHT_ERROR,
  payload: error
});

export const getRangeWeightInternationalList = (params) => ({
  type: PRI_INT_RANGE_WEIGHT_GET_LIST,
  payload: { params }
});

export const getRangeWeightInternationalListSuccess = (items, total) => ({
  type: PRI_INT_RANGE_WEIGHT_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addRangeWeightInternationalItem = (item) => ({
  type: PRI_INT_RANGE_WEIGHT_ADD_ITEM,
  payload: { item }
});

export const addRangeWeightInternationalItemSuccess = () => ({
  type: PRI_INT_RANGE_WEIGHT_ADD_ITEM_SUCCESS
});

export const requestUpdateRangeWeightInternationalItem = (param) => ({
  type: PRI_INT_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  payload: { param }
});

export const requestUpdateRangeWeightInternationalItemSuccess = (data) => ({
  type: PRI_INT_RANGE_WEIGHT_REQUEST_UPDATE_ITEM_SUCCESS,
  payload: data
})

export const updateRangeWeightInternationalItem = (item) => ({
  type: PRI_INT_RANGE_WEIGHT_UPDATE_ITEM,
  payload: { item }
});

export const updateRangeWeightInternationalItemSuccess = () => ({
  type: PRI_INT_RANGE_WEIGHT_UPDATE_ITEM_SUCCESS
});

export const deleteRangeWeightInternationalItem = (ids) => ({
  type: PRI_INT_RANGE_WEIGHT_DELETE_ITEM,
  payload: { ids }
});

export const deleteRangeWeightInternationalItemSuccess = () => ({
  type: PRI_INT_RANGE_WEIGHT_DELETE_ITEM_SUCCESS,
});