import {
  PRI_DOM_RANGE_WEIGHT_ERROR,

  PRI_DOM_RANGE_WEIGHT_GET_LIST,
  PRI_DOM_RANGE_WEIGHT_GET_LIST_SUCCESS,

  PRI_DOM_RANGE_WEIGHT_ADD_ITEM,
  PRI_DOM_RANGE_WEIGHT_ADD_ITEM_SUCCESS,

  PRI_DOM_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  PRI_DOM_RANGE_WEIGHT_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_DOM_RANGE_WEIGHT_UPDATE_ITEM,
  PRI_DOM_RANGE_WEIGHT_UPDATE_ITEM_SUCCESS,

  PRI_DOM_RANGE_WEIGHT_DELETE_ITEM,
  PRI_DOM_RANGE_WEIGHT_DELETE_ITEM_SUCCESS,
} from '../../../constants/actionTypes';

export const rangeWeightDomesticError = (error) => ({
  type: PRI_DOM_RANGE_WEIGHT_ERROR,
  payload: error
});

export const getRangeWeightDomesticList = (params) => ({
  type: PRI_DOM_RANGE_WEIGHT_GET_LIST,
  payload: { params }
});

export const getRangeWeightDomesticListSuccess = (items, total) => ({
  type: PRI_DOM_RANGE_WEIGHT_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addRangeWeightDomesticItem = (item) => ({
  type: PRI_DOM_RANGE_WEIGHT_ADD_ITEM,
  payload: { item }
});

export const addRangeWeightDomesticItemSuccess = () => ({
  type: PRI_DOM_RANGE_WEIGHT_ADD_ITEM_SUCCESS
});

export const requestUpdateRangeWeightDomesticItem = (param) => ({
  type: PRI_DOM_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  payload: { param }
});

export const requestUpdateRangeWeightDomesticItemSuccess = (data) => ({
  type: PRI_DOM_RANGE_WEIGHT_REQUEST_UPDATE_ITEM_SUCCESS,
  payload: data
})

export const updateRangeWeightDomesticItem = (item) => ({
  type: PRI_DOM_RANGE_WEIGHT_UPDATE_ITEM,
  payload: { item }
});

export const updateRangeWeightDomesticItemSuccess = () => ({
  type: PRI_DOM_RANGE_WEIGHT_UPDATE_ITEM_SUCCESS
});

export const deleteRangeWeightDomesticItem = (ids) => ({
  type: PRI_DOM_RANGE_WEIGHT_DELETE_ITEM,
  payload: { ids }
});

export const deleteRangeWeightDomesticItemSuccess = () => ({
  type: PRI_DOM_RANGE_WEIGHT_DELETE_ITEM_SUCCESS,
});