import {
  STATUS_TOGGLE_MODAL,
  STATUS_GET_LIST,
  STATUS_GET_LIST_SUCCESS,
  STATUS_GET_LIST_ERROR,
  STATUS_ADD_ITEM,
  STATUS_ADD_ITEM_SUCCESS,
  STATUS_ADD_ITEM_ERROR,
  STATUS_UPDATE_ITEM,
  STATUS_UPDATE_ITEM_SUCCESS,
  STATUS_UPDATE_ITEM_ERROR,
  STATUS_DELETE_ITEM,
  STATUS_DELETE_ITEM_SUCCESS,
  STATUS_DELETE_ITEM_ERROR
} from '../../../constants/actionTypes';

export const toggleStatusModal = (status = null) => ({
  type: STATUS_TOGGLE_MODAL,
  payload: status
})

export const getStatusList = (params) => ({
  type: STATUS_GET_LIST,
  payload: params
});

export const getStatusListSuccess = (items, total) => ({
  type: STATUS_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getStatusListError = (error) => ({
  type: STATUS_GET_LIST_ERROR,
  payload: error
});

export const addStatusItem = (item) => ({
  type: STATUS_ADD_ITEM,
  payload: item
});

export const addStatusItemSuccess = () => ({
  type: STATUS_ADD_ITEM_SUCCESS,
});

export const addStatusItemError = (error) => ({
  type: STATUS_ADD_ITEM_ERROR,
  payload: error
});

export const updateStatusItem = (item) => ({
  type: STATUS_UPDATE_ITEM,
  payload: item
});

export const updateStatusItemSuccess = () => ({
  type: STATUS_UPDATE_ITEM_SUCCESS,
});

export const updateStatusItemError = (error) => ({
  type: STATUS_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteStatusItem = (id) => ({
  type: STATUS_DELETE_ITEM,
  payload: id
});

export const deleteStatusItemSuccess = () => ({
  type: STATUS_DELETE_ITEM_SUCCESS,
});

export const deleteStatusItemError = (error) => ({
  type: STATUS_DELETE_ITEM_ERROR,
  payload: error
});