import {
  PRI_DOM_AREA_ERROR,
  PRI_DOM_AREA_TOGGLE_MODAL,
  PRI_DOM_AREA_CHANGE_TYPE_MODAL,

  PRI_DOM_AREA_GET_LIST,
  PRI_DOM_AREA_GET_LIST_SUCCESS,

  PRI_DOM_AREA_GET_LIST_CITY,
  PRI_DOM_AREA_GET_LIST_CITY_SUCCESS,

  PRI_DOM_AREA_ADD_ITEM,
  PRI_DOM_AREA_ADD_ITEM_SUCCESS,

  PRI_DOM_AREA_UPDATE_ITEM,
  PRI_DOM_AREA_UPDATE_ITEM_SUCCESS,

  PRI_DOM_AREA_DELETE_ITEM,
  PRI_DOM_AREA_DELETE_ITEM_SUCCESS,
} from '../../../constants/actionTypes';

export const areaDomesticError = (error) => ({
  type: PRI_DOM_AREA_ERROR,
  payload: error
});

export const toggleAreaDomesticModal = (type, data) => ({
  type: PRI_DOM_AREA_TOGGLE_MODAL,
  payload: { type, data }
});

export const changeTypeAreaDomesticModal = (type) => ({
  type: PRI_DOM_AREA_CHANGE_TYPE_MODAL,
  payload: type
})

export const getAreaDomesticList = (params) => ({
  type: PRI_DOM_AREA_GET_LIST,
  payload: { params }
});

export const getAreaDomesticListSuccess = (items, total) => ({
  type: PRI_DOM_AREA_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getCityAreaDomesticList = (params) => ({
  type: PRI_DOM_AREA_GET_LIST_CITY,
  payload: { params }
});

export const getCityAreaDomesticListSuccess = (cities) => ({
  type: PRI_DOM_AREA_GET_LIST_CITY_SUCCESS,
  payload: { cities }
});

export const addAreaDomesticItem = (item) => ({
  type: PRI_DOM_AREA_ADD_ITEM,
  payload: { item }
});

export const addAreaDomesticItemSuccess = () => ({
  type: PRI_DOM_AREA_ADD_ITEM_SUCCESS
});

export const updateAreaDomesticItem = (item) => ({
  type: PRI_DOM_AREA_UPDATE_ITEM,
  payload: { item }
});

export const updateAreaDomesticItemSuccess = () => ({
  type: PRI_DOM_AREA_UPDATE_ITEM_SUCCESS
});

export const deleteAreaDomesticItem = (ids) => ({
  type: PRI_DOM_AREA_DELETE_ITEM,
  payload: { ids }
});

export const deleteAreaDomesticItemSuccess = () => ({
  type: PRI_DOM_AREA_DELETE_ITEM_SUCCESS,
});