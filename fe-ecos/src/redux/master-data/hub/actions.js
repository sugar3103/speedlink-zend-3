import {
  HUB_TOGGLE_MODAL,
  HUB_TOGGLE_DETAIL_MODAL,
  HUB_GET_LIST,
  HUB_GET_LIST_SUCCESS,
  HUB_GET_LIST_ERROR,
  HUB_ADD_ITEM,
  HUB_ADD_ITEM_SUCCESS,
  HUB_ADD_ITEM_ERROR,
  HUB_UPDATE_ITEM,
  HUB_UPDATE_ITEM_SUCCESS,
  HUB_UPDATE_ITEM_ERROR,
  HUB_DELETE_ITEM,
  HUB_DELETE_ITEM_SUCCESS,
  HUB_DELETE_ITEM_ERROR
} from '../../../constants/actionTypes';

export const toggleHubModal = (hub = null) => ({
  type: HUB_TOGGLE_MODAL,
  payload: hub
})

export const toggleHubDetailModal = (hub = null) => ({
  type: HUB_TOGGLE_DETAIL_MODAL,
  payload: hub
})

export const getHubList = (params, messages) => ({
  type: HUB_GET_LIST,
  payload: { params, messages }
});

export const getHubListSuccess = (items, total) => ({
  type: HUB_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getHubListError = (error) => ({
  type: HUB_GET_LIST_ERROR,
  payload: error
});

export const addHubItem = (item, messages) => ({
  type: HUB_ADD_ITEM,
  payload: { item, messages }
});

export const addHubItemSuccess = () => ({
  type: HUB_ADD_ITEM_SUCCESS,
});

export const addHubItemError = (error) => ({
  type: HUB_ADD_ITEM_ERROR,
  payload: error
});

export const updateHubItem = (item, messages) => ({
  type: HUB_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateHubItemSuccess = () => ({
  type: HUB_UPDATE_ITEM_SUCCESS,
});

export const updateHubItemError = (error) => ({
  type: HUB_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteHubItem = (id, messages) => ({
  type: HUB_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteHubItemSuccess = () => ({
  type: HUB_DELETE_ITEM_SUCCESS,
});

export const deleteHubItemError = (error) => ({
  type: HUB_DELETE_ITEM_ERROR,
  payload: error
});
