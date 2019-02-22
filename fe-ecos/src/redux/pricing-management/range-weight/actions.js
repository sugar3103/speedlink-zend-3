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
    RANGE_WEIGHT_CHANGE_TYPE_MODAL
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
  
  export const deleteRangeWeightItem = (id, messages) => ({
    type: RANGE_WEIGHT_DELETE_ITEM,
    payload: { id, messages }
  });
  
  export const deleteRangeWeightItemSuccess = () => ({
    type: RANGE_WEIGHT_DELETE_ITEM_SUCCESS,
  });
  
  export const deleteRangeWeightItemError = (error) => ({
    type: RANGE_WEIGHT_DELETE_ITEM_ERROR,
    payload: error
  });