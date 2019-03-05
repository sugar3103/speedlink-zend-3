import {
  SERVICE_TOGGLE_MODAL,
  SERVICE_GET_LIST,
  SERVICE_GET_LIST_SUCCESS,
  SERVICE_GET_LIST_ERROR,
  SERVICE_ADD_ITEM,
  SERVICE_ADD_ITEM_SUCCESS,
  SERVICE_ADD_ITEM_ERROR,
  SERVICE_UPDATE_ITEM,
  SERVICE_UPDATE_ITEM_SUCCESS,
  SERVICE_UPDATE_ITEM_ERROR,
  SERVICE_DELETE_ITEM,
  SERVICE_DELETE_ITEM_SUCCESS,
  SERVICE_DELETE_ITEM_ERROR,
  SERVICE_CODE_GET_LIST,
  SERVICE_CODE_GET_LIST_SUCCESS,
  SERVICE_CODE_GET_LIST_ERROR,
  SERVICE_CHANGE_TYPE_MODAL
} from '../../../../constants/actionTypes';

export const toggleServiceModal = (type, data) => ({
  type: SERVICE_TOGGLE_MODAL,
  payload: { type, data}
});

export const getServiceList = (params) => ({
  type: SERVICE_GET_LIST,
  payload: { params }
});

export const getServiceListSuccess = (items, total) => ({
  type: SERVICE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getServiceListError = (error) => ({
  type: SERVICE_GET_LIST_ERROR,
  payload: error
});

export const getServiceCodeList = () => ({
  type: SERVICE_CODE_GET_LIST,
  payload: { }
});

export const getServiceCodeListSuccess = (codes) => ({
  type: SERVICE_CODE_GET_LIST_SUCCESS,
  payload: { codes }
});

export const getServiceCodeListError = (error) => ({
  type: SERVICE_CODE_GET_LIST_ERROR,
  payload: error
});

export const addServiceItem = (item, messages) => ({
  type: SERVICE_ADD_ITEM,
  payload: { item, messages }
});

export const addServiceItemSuccess = () => ({
  type: SERVICE_ADD_ITEM_SUCCESS,
});

export const addServiceItemError = (error) => ({
  type: SERVICE_ADD_ITEM_ERROR,
  payload: error
});

export const updateServiceItem = (item, messages) => ({
  type: SERVICE_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateServiceItemSuccess = () => ({
  type: SERVICE_UPDATE_ITEM_SUCCESS,
});

export const updateServiceItemError = (error) => ({
  type: SERVICE_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteServiceItem = (id, messages) => ({
  type: SERVICE_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteServiceItemSuccess = () => ({
  type: SERVICE_DELETE_ITEM_SUCCESS,
});

export const deleteServiceItemError = (error) => ({
  type: SERVICE_DELETE_ITEM_ERROR,
  payload: error
});

export const changeTypeServiceModal = (type) => ({
  type: SERVICE_CHANGE_TYPE_MODAL,
  payload: type
})