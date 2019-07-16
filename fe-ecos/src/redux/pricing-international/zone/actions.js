import {
  PRI_INT_ZONE_ERROR,

  PRI_INT_ZONE_GET_LIST,
  PRI_INT_ZONE_GET_LIST_SUCCESS,

  PRI_INT_ZONE_ADD_ITEM,
  PRI_INT_ZONE_ADD_ITEM_SUCCESS,

  PRI_INT_ZONE_REQUEST_UPDATE_ITEM,
  PRI_INT_ZONE_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_INT_ZONE_UPDATE_ITEM,
  PRI_INT_ZONE_UPDATE_ITEM_SUCCESS,

  PRI_INT_ZONE_DELETE_ITEM,
  PRI_INT_ZONE_DELETE_ITEM_SUCCESS,
} from '../../../constants/actionTypes';

export const zoneInternationalError = (error) => ({
  type: PRI_INT_ZONE_ERROR,
  payload: error
});

export const getZoneInternationalList = (params) => ({
  type: PRI_INT_ZONE_GET_LIST,
  payload: { params }
});

export const getZoneInternationalListSuccess = (items, total) => ({
  type: PRI_INT_ZONE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addZoneInternationalItem = (item) => ({
  type: PRI_INT_ZONE_ADD_ITEM,
  payload: { item }
});

export const addZoneInternationalItemSuccess = () => ({
  type: PRI_INT_ZONE_ADD_ITEM_SUCCESS
});

export const requestUpdateZoneInternationalItem = (param) => ({
  type: PRI_INT_ZONE_REQUEST_UPDATE_ITEM,
  payload: { param }
});

export const requestUpdateZoneInternationalItemSuccess = (data) => ({
  type: PRI_INT_ZONE_REQUEST_UPDATE_ITEM_SUCCESS,
  payload: data
})

export const updateZoneInternationalItem = (item) => ({
  type: PRI_INT_ZONE_UPDATE_ITEM,
  payload: { item }
});

export const updateZoneInternationalItemSuccess = () => ({
  type: PRI_INT_ZONE_UPDATE_ITEM_SUCCESS
});

export const deleteZoneInternationalItem = (ids) => ({
  type: PRI_INT_ZONE_DELETE_ITEM,
  payload: { ids }
});

export const deleteZoneInternationalItemSuccess = () => ({
  type: PRI_INT_ZONE_DELETE_ITEM_SUCCESS,
});