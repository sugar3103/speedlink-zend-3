import {
  BRANCH_TOGGLE_MODAL,
  BRANCH_GET_LIST,
  BRANCH_GET_LIST_SUCCESS,
  BRANCH_GET_LIST_ERROR,
  BRANCH_ADD_ITEM,
  BRANCH_ADD_ITEM_SUCCESS,
  BRANCH_ADD_ITEM_ERROR,
  BRANCH_UPDATE_ITEM,
  BRANCH_UPDATE_ITEM_SUCCESS,
  BRANCH_UPDATE_ITEM_ERROR,
  BRANCH_DELETE_ITEM,
  BRANCH_DELETE_ITEM_SUCCESS,
  BRANCH_DELETE_ITEM_ERROR,
  BRANCH_CHANGE_TYPE_MODAL
} from '../../../constants/actionTypes';

export const toggleBranchModal = (type, data) => ({
  type: BRANCH_TOGGLE_MODAL,
  payload: { type, data }
})

export const changeTypeBranchModal = (type) => ({
  type: BRANCH_CHANGE_TYPE_MODAL,
  payload: type
})

export const getBranchList = (params, messages) => ({
  type: BRANCH_GET_LIST,
  payload: { params, messages }
});

export const getBranchListSuccess = (items, total) => ({
  type: BRANCH_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getBranchListError = (error) => ({
  type: BRANCH_GET_LIST_ERROR,
  payload: error
});

export const addBranchItem = (item, messages) => ({
  type: BRANCH_ADD_ITEM,
  payload: { item, messages }
});

export const addBranchItemSuccess = () => ({
  type: BRANCH_ADD_ITEM_SUCCESS,
});

export const addBranchItemError = (error) => ({
  type: BRANCH_ADD_ITEM_ERROR,
  payload: error
});

export const updateBranchItem = (item, messages) => ({
  type: BRANCH_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateBranchItemSuccess = () => ({
  type: BRANCH_UPDATE_ITEM_SUCCESS,
});

export const updateBranchItemError = (error) => ({
  type: BRANCH_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteBranchItem = (id, messages) => ({
  type: BRANCH_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteBranchItemSuccess = () => ({
  type: BRANCH_DELETE_ITEM_SUCCESS,
});

export const deleteBranchItemError = (error) => ({
  type: BRANCH_DELETE_ITEM_ERROR,
  payload: error
});
