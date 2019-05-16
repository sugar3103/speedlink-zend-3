import {
  DISTRICT_TOGGLE_MODAL,
  DISTRICT_GET_LIST,
  DISTRICT_GET_LIST_SUCCESS,
  DISTRICT_GET_LIST_ERROR,
  DISTRICT_ADD_ITEM,
  DISTRICT_ADD_ITEM_SUCCESS,
  DISTRICT_ADD_ITEM_ERROR,
  DISTRICT_UPDATE_ITEM,
  DISTRICT_UPDATE_ITEM_SUCCESS,
  DISTRICT_UPDATE_ITEM_ERROR,
  DISTRICT_DELETE_ITEM,
  DISTRICT_DELETE_ITEM_SUCCESS,
  DISTRICT_DELETE_ITEM_ERROR,
  DISTRICT_CHANGE_TYPE_MODAL
} from '../../../../constants/actionTypes';

export const toggleDistrictModal = (type, data) => ({
  type: DISTRICT_TOGGLE_MODAL,
  payload: { type, data }
})

export const getDistrictList = (params) => ({
  type: DISTRICT_GET_LIST,
  payload: { params }
});

export const getDistrictListSuccess = (items, total) => ({
  type: DISTRICT_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getDistrictListError = (error) => ({
  type: DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const addDistrictItem = (item) => ({
  type: DISTRICT_ADD_ITEM,
  payload: { item }
});

export const addDistrictItemSuccess = () => ({
  type: DISTRICT_ADD_ITEM_SUCCESS,
});

export const addDistrictItemError = (error) => ({
  type: DISTRICT_ADD_ITEM_ERROR,
  payload: error
});

export const updateDistrictItem = (item) => ({
  type: DISTRICT_UPDATE_ITEM,
  payload: { item }
});

export const updateDistrictItemSuccess = () => ({
  type: DISTRICT_UPDATE_ITEM_SUCCESS,
});

export const updateDistrictItemError = (error) => ({
  type: DISTRICT_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteDistrictItem = (id) => ({
  type: DISTRICT_DELETE_ITEM,
  payload: { id }
});

export const deleteDistrictItemSuccess = () => ({
  type: DISTRICT_DELETE_ITEM_SUCCESS,
});

export const deleteDistrictItemError = (error) => ({
  type: DISTRICT_DELETE_ITEM_ERROR,
  payload: error
});

export const changeTypeDistrictModal = (type) => ({
  type: DISTRICT_CHANGE_TYPE_MODAL,
  payload: type
})