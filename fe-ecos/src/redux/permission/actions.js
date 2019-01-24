import {
  PERMISSION_TOGGLE_MODAL,
  PERMISSION_GET_LIST,
  PERMISSION_GET_LIST_SUCCESS,
  PERMISSION_GET_LIST_ERROR,
  PERMISSION_ADD_ITEM,
  PERMISSION_ADD_ITEM_SUCCESS,
  PERMISSION_ADD_ITEM_ERROR,
  PERMISSION_UPDATE_ITEM,
  PERMISSION_UPDATE_ITEM_SUCCESS,
  PERMISSION_UPDATE_ITEM_ERROR,
  PERMISSION_DELETE_ITEM,
  PERMISSION_DELETE_ITEM_SUCCESS,
  PERMISSION_DELETE_ITEM_ERROR
} from '../../constants/actionTypes';

export const togglePermissionModal = (status = null) => ({
  type: PERMISSION_TOGGLE_MODAL,
  payload: status
})

export const getPermissionList = (params) => ({
  type: PERMISSION_GET_LIST,
  payload: params
});

export const getPermissionListSuccess = (items, total) => ({
  type: PERMISSION_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getPermissionListError = (error) => ({
  type: PERMISSION_GET_LIST_ERROR,
  payload: error
});

export const addPermissionItem = (item) => ({
  type: PERMISSION_ADD_ITEM,
  payload: item
});

export const addPermissionItemSuccess = () => ({
  type: PERMISSION_ADD_ITEM_SUCCESS,
});

export const addPermissionItemError = (error) => ({
  type: PERMISSION_ADD_ITEM_ERROR,
  payload: error
});

export const updatePermissionItem = (item) => ({
  type: PERMISSION_UPDATE_ITEM,
  payload: item
});

export const updatePermissionItemSuccess = () => ({
  type: PERMISSION_UPDATE_ITEM_SUCCESS,
});

export const updatePermissionItemError = (error) => ({
  type: PERMISSION_UPDATE_ITEM_ERROR,
  payload: error
});

export const deletePermissionItem = (id) => ({
  type: PERMISSION_DELETE_ITEM,
  payload: id
});

export const deletePermissionItemSuccess = () => ({
  type: PERMISSION_DELETE_ITEM_SUCCESS,
});

export const deletePermissionItemError = (error) => ({
  type: PERMISSION_DELETE_ITEM_ERROR,
  payload: error
});