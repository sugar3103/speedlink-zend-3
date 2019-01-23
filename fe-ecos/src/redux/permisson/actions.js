import {
  PERMISSON_TOGGLE_MODAL,
  PERMISSON_GET_LIST,
  PERMISSON_GET_LIST_SUCCESS,
  PERMISSON_GET_LIST_ERROR,
  PERMISSON_ADD_ITEM,
  PERMISSON_ADD_ITEM_SUCCESS,
  PERMISSON_ADD_ITEM_ERROR,
  PERMISSON_UPDATE_ITEM,
  PERMISSON_UPDATE_ITEM_SUCCESS,
  PERMISSON_UPDATE_ITEM_ERROR,
  PERMISSON_DELETE_ITEM,
  PERMISSON_DELETE_ITEM_SUCCESS,
  PERMISSON_DELETE_ITEM_ERROR
} from '../../constants/actionTypes';

export const togglePermissonModal = (status = null) => ({
  type: PERMISSON_TOGGLE_MODAL,
  payload: status
})

export const getPermissonList = (params) => ({
  type: PERMISSON_GET_LIST,
  payload: params
});

export const getPermissonListSuccess = (items, total) => ({
  type: PERMISSON_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getPermissonListError = (error) => ({
  type: PERMISSON_GET_LIST_ERROR,
  payload: error
});

export const addPermissonItem = (item) => ({
  type: PERMISSON_ADD_ITEM,
  payload: item
});

export const addPermissonItemSuccess = () => ({
  type: PERMISSON_ADD_ITEM_SUCCESS,
});

export const addPermissonItemError = (error) => ({
  type: PERMISSON_ADD_ITEM_ERROR,
  payload: error
});

export const updatePermissonItem = (item) => ({
  type: PERMISSON_UPDATE_ITEM,
  payload: item
});

export const updatePermissonItemSuccess = () => ({
  type: PERMISSON_UPDATE_ITEM_SUCCESS,
});

export const updatePermissonItemError = (error) => ({
  type: PERMISSON_UPDATE_ITEM_ERROR,
  payload: error
});

export const deletePermissonItem = (id) => ({
  type: PERMISSON_DELETE_ITEM,
  payload: id
});

export const deletePermissonItemSuccess = () => ({
  type: PERMISSON_DELETE_ITEM_SUCCESS,
});

export const deletePermissonItemError = (error) => ({
  type: PERMISSON_DELETE_ITEM_ERROR,
  payload: error
});