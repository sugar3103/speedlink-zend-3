import {
  USER_TOGGLE_MODAL,
  USER_GET_LIST,
  USER_GET_LIST_SUCCESS,
  USER_GET_LIST_ERROR,
  USER_ADD_ITEM,
  USER_ADD_ITEM_SUCCESS,
  USER_ADD_ITEM_ERROR,
  USER_UPDATE_ITEM,
  USER_UPDATE_ITEM_SUCCESS,
  USER_UPDATE_ITEM_ERROR,
  USER_DELETE_ITEM,
  USER_DELETE_ITEM_SUCCESS,
  USER_DELETE_ITEM_ERROR
} from '../../constants/actionTypes';

export const toggleUserModal = (status = null) => ({
  type: USER_TOGGLE_MODAL,
  payload: status
})

export const getUserList = (params) => ({
  type: USER_GET_LIST,
  payload: params
});

export const getUserListSuccess = (items, total) => ({
  type: USER_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getUserListError = (error) => ({
  type: USER_GET_LIST_ERROR,
  payload: error
});

export const addUserItem = (item) => ({
  type: USER_ADD_ITEM,
  payload: item
});

export const addUserItemSuccess = () => ({
  type: USER_ADD_ITEM_SUCCESS,
});

export const addUserItemError = (error) => ({
  type: USER_ADD_ITEM_ERROR,
  payload: error
});

export const updateUserItem = (item) => ({
  type: USER_UPDATE_ITEM,
  payload: item
});

export const updateUserItemSuccess = () => ({
  type: USER_UPDATE_ITEM_SUCCESS,
});

export const updateUserItemError = (error) => ({
  type: USER_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteUserItem = (id) => ({
  type: USER_DELETE_ITEM,
  payload: id
});

export const deleteUserItemSuccess = () => ({
  type: USER_DELETE_ITEM_SUCCESS,
});

export const deleteUserItemError = (error) => ({
  type: USER_DELETE_ITEM_ERROR,
  payload: error
});