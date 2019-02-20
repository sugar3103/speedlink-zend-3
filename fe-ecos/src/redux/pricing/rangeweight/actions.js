import {
    RANGEWEIGHT_TOGGLE_MODAL,
    RANGEWEIGHT_GET_LIST,
    RANGEWEIGHT_GET_LIST_SUCCESS,
    RANGEWEIGHT_GET_LIST_ERROR,
    RANGEWEIGHT_ADD_ITEM,
    RANGEWEIGHT_ADD_ITEM_SUCCESS,
    RANGEWEIGHT_ADD_ITEM_ERROR,
    RANGEWEIGHT_UPDATE_ITEM,
    RANGEWEIGHT_UPDATE_ITEM_SUCCESS,
    RANGEWEIGHT_UPDATE_ITEM_ERROR,
    RANGEWEIGHT_DELETE_ITEM,
    RANGEWEIGHT_DELETE_ITEM_SUCCESS,
    RANGEWEIGHT_DELETE_ITEM_ERROR
  } from '../../../constants/actionTypes';
  
  export const toggleRangeWeightModal = (rangeweight = null) => ({
    type: RANGEWEIGHT_TOGGLE_MODAL,
    payload: rangeweight
  });
  
  export const getRangeWeightList = (params) => ({
    type: RANGEWEIGHT_GET_LIST,
    payload: { params }
  });
  
  export const getRangeWeightListSuccess = (items, total) => ({
    type: RANGEWEIGHT_GET_LIST_SUCCESS,
    payload: { items, total }
  });
  
  export const getRangeWeightListError = (error) => ({
    type: RANGEWEIGHT_GET_LIST_ERROR,
    payload: error
  });
  
  export const addRangeWeightItem = (item, messages) => ({
    type: RANGEWEIGHT_ADD_ITEM,
    payload: { item, messages }
  });
  
  export const addRangeWeightItemSuccess = () => ({
    type: RANGEWEIGHT_ADD_ITEM_SUCCESS,
  });
  
  export const addRangeWeightItemError = (error) => ({
    type: RANGEWEIGHT_ADD_ITEM_ERROR,
    payload: error
  });
  
  export const updateRangeWeightItem = (item, messages) => ({
    type: RANGEWEIGHT_UPDATE_ITEM,
    payload: { item, messages }
  });
  
  export const updateRangeWeightItemSuccess = () => ({
    type: RANGEWEIGHT_UPDATE_ITEM_SUCCESS,
  });
  
  export const updateRangeWeightItemError = (error) => ({
    type: RANGEWEIGHT_UPDATE_ITEM_ERROR,
    payload: error
  });
  
  export const deleteRangeWeightItem = (id, messages) => ({
    type: RANGEWEIGHT_DELETE_ITEM,
    payload: { id, messages }
  });
  
  export const deleteRangeWeightItemSuccess = () => ({
    type: RANGEWEIGHT_DELETE_ITEM_SUCCESS,
  });
  
  export const deleteRangeWeightItemError = (error) => ({
    type: RANGEWEIGHT_DELETE_ITEM_ERROR,
    payload: error
  });