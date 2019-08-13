import {
  PRI_SPECIAL_ZONE_ERROR,
  PRI_SPECIAL_ZONE_TOGGLE_MODAL,
  PRI_SPECIAL_ZONE_CHANGE_TYPE_MODAL,

  PRI_SPECIAL_ZONE_GET_LIST,
  PRI_SPECIAL_ZONE_GET_LIST_SUCCESS,

  PRI_SPECIAL_ZONE_ADD_ITEM,
  PRI_SPECIAL_ZONE_ADD_ITEM_SUCCESS,

  PRI_SPECIAL_ZONE_UPDATE_ITEM,
  PRI_SPECIAL_ZONE_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_ZONE_DELETE_ITEM,
  PRI_SPECIAL_ZONE_DELETE_ITEM_SUCCESS,
} from '../../../constants/actionTypes';

export const zoneSpecialError = (error) => ({
  type: PRI_SPECIAL_ZONE_ERROR,
  payload: error
});

export const toggleZoneSpecialModal = (type, data) => ({
  type: PRI_SPECIAL_ZONE_TOGGLE_MODAL,
  payload: { type, data }
});

export const changeTypeZoneSpecialModal = (type) => ({
  type: PRI_SPECIAL_ZONE_CHANGE_TYPE_MODAL,
  payload: type
})

export const getZoneSpecialList = (params) => ({
  type: PRI_SPECIAL_ZONE_GET_LIST,
  payload: { params }
});

export const getZoneSpecialListSuccess = (items, total) => ({
  type: PRI_SPECIAL_ZONE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addZoneSpecialItem = (item) => ({
  type: PRI_SPECIAL_ZONE_ADD_ITEM,
  payload: { item }
});

export const addZoneSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_ZONE_ADD_ITEM_SUCCESS
});

export const updateZoneSpecialItem = (item) => ({
  type: PRI_SPECIAL_ZONE_UPDATE_ITEM,
  payload: { item }
});

export const updateZoneSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_ZONE_UPDATE_ITEM_SUCCESS
});

export const deleteZoneSpecialItem = (ids) => ({
  type: PRI_SPECIAL_ZONE_DELETE_ITEM,
  payload: { ids }
});

export const deleteZoneSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_ZONE_DELETE_ITEM_SUCCESS,
});