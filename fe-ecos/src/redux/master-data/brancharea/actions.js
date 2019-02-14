import {
    BRANCHAREA_TOGGLE_MODAL,
    BRANCHAREA_GET_LIST,
    BRANCHAREA_GET_LIST_SUCCESS,
    BRANCHAREA_GET_LIST_ERROR,
    BRANCHAREA_ADD_ITEM,
    BRANCHAREA_ADD_ITEM_SUCCESS,
    BRANCHAREA_ADD_ITEM_ERROR,
    BRANCHAREA_UPDATE_ITEM,
    BRANCHAREA_UPDATE_ITEM_SUCCESS,
    BRANCHAREA_UPDATE_ITEM_ERROR,
    BRANCHAREA_DELETE_ITEM,
    BRANCHAREA_DELETE_ITEM_SUCCESS,
    BRANCHAREA_DELETE_ITEM_ERROR
  } from '../../../constants/actionTypes';
  
  export const toggleBranchAreaModal = (brancharea = null) => ({
    type: BRANCHAREA_TOGGLE_MODAL,
    payload: brancharea
  })
  
  export const getBranchAreaList = (params, messages) => ({
    type: BRANCHAREA_GET_LIST,
    payload: { params, messages }
  });
  
  export const getBranchAreaListSuccess = (items, total) => ({
    type: BRANCHAREA_GET_LIST_SUCCESS,
    payload: { items, total }
  });
  
  export const getBranchAreaListError = (error) => ({
    type: BRANCHAREA_GET_LIST_ERROR,
    payload: error
  });
  
  export const addBranchAreaItem = (item, messages) => ({
    type: BRANCHAREA_ADD_ITEM,
    payload: { item, messages }
  });
  
  export const addBranchAreaItemSuccess = () => ({
    type: BRANCHAREA_ADD_ITEM_SUCCESS,
  });
  
  export const addBranchAreaItemError = (error) => ({
    type: BRANCHAREA_ADD_ITEM_ERROR,
    payload: error
  });
  
  export const updateBranchAreaItem = (item, messages) => ({
    type: BRANCHAREA_UPDATE_ITEM,
    payload: { item, messages }
  });
  
  export const updateBranchAreaItemSuccess = () => ({
    type: BRANCHAREA_UPDATE_ITEM_SUCCESS,
  });
  
  export const updateBranchAreaItemError = (error) => ({
    type: BRANCHAREA_UPDATE_ITEM_ERROR,
    payload: error
  });
  
  export const deleteBranchAreaItem = (id, messages) => ({
    type: BRANCHAREA_DELETE_ITEM,
    payload: { id, messages }
  });
  
  export const deleteBranchAreaItemSuccess = () => ({
    type: BRANCHAREA_DELETE_ITEM_SUCCESS,
  });
  
  export const deleteBranchAreaItemError = (error) => ({
    type: BRANCHAREA_DELETE_ITEM_ERROR,
    payload: error
  });
  