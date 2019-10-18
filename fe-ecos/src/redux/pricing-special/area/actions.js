import {
  PRI_SPECIAL_AREA_ERROR,
  PRI_SPECIAL_AREA_TOGGLE_MODAL,
  PRI_SPECIAL_AREA_CHANGE_TYPE_MODAL,

  PRI_SPECIAL_AREA_GET_LIST,
  PRI_SPECIAL_AREA_GET_LIST_SUCCESS,

  PRI_SPECIAL_AREA_ADD_ITEM,
  PRI_SPECIAL_AREA_ADD_ITEM_SUCCESS,

  PRI_SPECIAL_AREA_UPDATE_ITEM,
  PRI_SPECIAL_AREA_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_AREA_DELETE_ITEM,
  PRI_SPECIAL_AREA_DELETE_ITEM_SUCCESS,
} from '../../../constants/actionTypes';

export const areaSpecialError = (error) => ({
  type: PRI_SPECIAL_AREA_ERROR,
  payload: error
});

export const toggleAreaSpecialModal = (type, data) => ({
  type: PRI_SPECIAL_AREA_TOGGLE_MODAL,
  payload: { type, data }
});

export const changeTypeAreaSpecialModal = (type) => ({
  type: PRI_SPECIAL_AREA_CHANGE_TYPE_MODAL,
  payload: type
})

export const getAreaSpecialList = (params) => ({
  type: PRI_SPECIAL_AREA_GET_LIST,
  payload: { params }
});

export const getAreaSpecialListSuccess = (items, total) => ({
  type: PRI_SPECIAL_AREA_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addAreaSpecialItem = (item) => ({
  type: PRI_SPECIAL_AREA_ADD_ITEM,
  payload: { item }
});

export const addAreaSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_AREA_ADD_ITEM_SUCCESS
});

export const updateAreaSpecialItem = (item) => ({
  type: PRI_SPECIAL_AREA_UPDATE_ITEM,
  payload: { item }
});

export const updateAreaSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_AREA_UPDATE_ITEM_SUCCESS
});

export const deleteAreaSpecialItem = (ids) => ({
  type: PRI_SPECIAL_AREA_DELETE_ITEM,
  payload: { ids }
});

export const deleteAreaSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_AREA_DELETE_ITEM_SUCCESS,
});