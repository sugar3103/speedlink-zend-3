import {
  WARD_TOGGLE_MODAL,
  WARD_GET_LIST,
  WARD_GET_LIST_SUCCESS,
  WARD_GET_LIST_ERROR,
  WARD_ADD_ITEM,
  WARD_ADD_ITEM_SUCCESS,
  WARD_ADD_ITEM_ERROR,
  WARD_UPDATE_ITEM,
  WARD_UPDATE_ITEM_SUCCESS,
  WARD_UPDATE_ITEM_ERROR,
  WARD_DELETE_ITEM,
  WARD_DELETE_ITEM_SUCCESS,
  WARD_DELETE_ITEM_ERROR,
  WARD_CHANGE_TYPE_MODAL
} from '../../../../constants/actionTypes';

export const toggleWardModal = (type, data) => ({
  type: WARD_TOGGLE_MODAL,
  payload: { type, data }
})

export const getWardList = (params) => ({
  type: WARD_GET_LIST,
  payload: { params }
});

export const getWardListSuccess = (items, total) => ({
  type: WARD_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getWardListError = (error) => ({
  type: WARD_GET_LIST_ERROR,
  payload: error
});

export const addWardItem = (item) => ({
  type: WARD_ADD_ITEM,
  payload: { item }
});

export const addWardItemSuccess = () => ({
  type: WARD_ADD_ITEM_SUCCESS,
});

export const addWardItemError = (error) => ({
  type: WARD_ADD_ITEM_ERROR,
  payload: error
});

export const updateWardItem = (item) => ({
  type: WARD_UPDATE_ITEM,
  payload: { item }
});

export const updateWardItemSuccess = () => ({
  type: WARD_UPDATE_ITEM_SUCCESS,
});

export const updateWardItemError = (error) => ({
  type: WARD_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteWardItem = (id) => ({
  type: WARD_DELETE_ITEM,
  payload: { id }
});

export const deleteWardItemSuccess = () => ({
  type: WARD_DELETE_ITEM_SUCCESS,
});

export const deleteWardItemError = (error) => ({
  type: WARD_DELETE_ITEM_ERROR,
  payload: error
});

export const changeTypeWardModal = (type) => ( {
  type: WARD_CHANGE_TYPE_MODAL,
  payload: type
})