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
  BRANCH_DELETE_ITEM_ERROR
} from '../../../constants/actionTypes';

export const toggleBranchModal = (branch = null) => ({
  type: BRANCH_TOGGLE_MODAL,
  payload: branch
})

export const getBranchList = (params, history) => ({
  type: BRANCH_GET_LIST,
  payload: { params, history }
});

export const getBranchListSuccess = (items) => ({
  type: BRANCH_GET_LIST_SUCCESS,
  payload: items
});

export const getBranchListError = (error) => ({
  type: BRANCH_GET_LIST_ERROR,
  payload: error
});

export const addBranchItem = (item, history) => ({
  type: BRANCH_ADD_ITEM,
  payload: { item, history }
});

export const addBranchItemSuccess = () => ({
  type: BRANCH_ADD_ITEM_SUCCESS,
});

export const addBranchItemError = (error) => ({
  type: BRANCH_ADD_ITEM_ERROR,
  payload: error
});

export const updateBranchItem = (item, history) => ({
  type: BRANCH_UPDATE_ITEM,
  payload: { item, history }
});

export const updateBranchItemSuccess = () => ({
  type: BRANCH_UPDATE_ITEM_SUCCESS,
});

export const updateBranchItemError = (error) => ({
  type: BRANCH_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteBranchItem = (item, history) => ({
  type: BRANCH_DELETE_ITEM,
  payload: { item, history }
});

export const deleteBranchItemSuccess = () => ({
  type: BRANCH_DELETE_ITEM_SUCCESS,
});

export const deleteBranchItemError = (error) => ({
  type: BRANCH_DELETE_ITEM_ERROR,
  payload: error
});