import {
  ROLE_TOGGLE_MODAL,
  ROLE_GET_LIST,
  ROLE_GET_LIST_SUCCESS,
  ROLE_GET_LIST_ERROR,
  ROLE_ADD_ITEM,
  ROLE_ADD_ITEM_SUCCESS,
  ROLE_ADD_ITEM_ERROR,
  ROLE_UPDATE_ITEM,
  ROLE_UPDATE_ITEM_SUCCESS,
  ROLE_UPDATE_ITEM_ERROR,
  ROLE_DELETE_ITEM,
  ROLE_DELETE_ITEM_SUCCESS,
  ROLE_DELETE_ITEM_ERROR
} from '../../../constants/actionTypes';

export const toggleRoleModal = (status = null) => ({
  type: ROLE_TOGGLE_MODAL,
  payload: status
})

export const getRoleList = (params) => ({
  type: ROLE_GET_LIST,
  payload: params
});

export const getRoleListSuccess = (items, total) => ({
  type: ROLE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getRoleListError = (error) => ({
  type: ROLE_GET_LIST_ERROR,
  payload: error
});

export const addRoleItem = (item) => ({
  type: ROLE_ADD_ITEM,
  payload: item
});

export const addRoleItemSuccess = () => ({
  type: ROLE_ADD_ITEM_SUCCESS,
});

export const addRoleItemError = (error) => ({
  type: ROLE_ADD_ITEM_ERROR,
  payload: error
});

export const updateRoleItem = (item) => ({
  type: ROLE_UPDATE_ITEM,
  payload: item
});

export const updateRoleItemSuccess = () => ({
  type: ROLE_UPDATE_ITEM_SUCCESS,
});

export const updateRoleItemError = (error) => ({
  type: ROLE_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteRoleItem = (id) => ({
  type: ROLE_DELETE_ITEM,
  payload: id
});

export const deleteRoleItemSuccess = () => ({
  type: ROLE_DELETE_ITEM_SUCCESS,
});

export const deleteRoleItemError = (error) => ({
  type: ROLE_DELETE_ITEM_ERROR,
  payload: error
});