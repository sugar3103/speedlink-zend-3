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
  DISTRICT_DELETE_ITEM_ERROR
} from '../../../../constants/actionTypes';

export const toggleDistrictModal = (district = null) => ({
  type: DISTRICT_TOGGLE_MODAL,
  payload: district
})

export const getDistrictList = (params, messages) => ({
  type: DISTRICT_GET_LIST,
  payload: { params, messages }
});

export const getDistrictListSuccess = (items, total) => ({
  type: DISTRICT_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getDistrictListError = (error) => ({
  type: DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const addDistrictItem = (item, messages) => ({
  type: DISTRICT_ADD_ITEM,
  payload: { item, messages }
});

export const addDistrictItemSuccess = () => ({
  type: DISTRICT_ADD_ITEM_SUCCESS,
});

export const addDistrictItemError = (error) => ({
  type: DISTRICT_ADD_ITEM_ERROR,
  payload: error
});

export const updateDistrictItem = (item, messages) => ({
  type: DISTRICT_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateDistrictItemSuccess = () => ({
  type: DISTRICT_UPDATE_ITEM_SUCCESS,
});

export const updateDistrictItemError = (error) => ({
  type: DISTRICT_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteDistrictItem = (id, messages) => ({
  type: DISTRICT_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteDistrictItemSuccess = () => ({
  type: DISTRICT_DELETE_ITEM_SUCCESS,
});

export const deleteDistrictItemError = (error) => ({
  type: DISTRICT_DELETE_ITEM_ERROR,
  payload: error
});