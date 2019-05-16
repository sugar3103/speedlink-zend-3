import {
  PRI_DOM_ZONE_ERROR,
  PRI_DOM_ZONE_TOGGLE_MODAL,
  PRI_DOM_ZONE_CHANGE_TYPE_MODAL,

  PRI_DOM_ZONE_GET_LIST,
  PRI_DOM_ZONE_GET_LIST_SUCCESS,

  PRI_DOM_ZONE_ADD_ITEM,
  PRI_DOM_ZONE_ADD_ITEM_SUCCESS,

  PRI_DOM_ZONE_UPDATE_ITEM,
  PRI_DOM_ZONE_UPDATE_ITEM_SUCCESS,

  PRI_DOM_ZONE_DELETE_ITEM,
  PRI_DOM_ZONE_DELETE_ITEM_SUCCESS,
} from '../../../constants/actionTypes';

export const zoneDomesticError = (error) => ({
  type: PRI_DOM_ZONE_ERROR,
  payload: error
});

export const toggleZoneDomesticModal = (type, data) => ({
  type: PRI_DOM_ZONE_TOGGLE_MODAL,
  payload: { type, data }
});

export const changeTypeZoneDomesticModal = (type) => ({
  type: PRI_DOM_ZONE_CHANGE_TYPE_MODAL,
  payload: type
})

export const getZoneDomesticList = (params) => ({
  type: PRI_DOM_ZONE_GET_LIST,
  payload: { params }
});

export const getZoneDomesticListSuccess = (items, total) => ({
  type: PRI_DOM_ZONE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addZoneDomesticItem = (item) => ({
  type: PRI_DOM_ZONE_ADD_ITEM,
  payload: { item }
});

export const addZoneDomesticItemSuccess = () => ({
  type: PRI_DOM_ZONE_ADD_ITEM_SUCCESS
});

export const updateZoneDomesticItem = (item) => ({
  type: PRI_DOM_ZONE_UPDATE_ITEM,
  payload: { item }
});

export const updateZoneDomesticItemSuccess = () => ({
  type: PRI_DOM_ZONE_UPDATE_ITEM_SUCCESS
});

export const deleteZoneDomesticItem = (ids) => ({
  type: PRI_DOM_ZONE_DELETE_ITEM,
  payload: { ids }
});

export const deleteZoneDomesticItemSuccess = () => ({
  type: PRI_DOM_ZONE_DELETE_ITEM_SUCCESS,
});