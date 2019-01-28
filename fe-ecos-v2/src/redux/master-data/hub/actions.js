import {
  HUB_TOGGLE_MODAL,
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
  HUB_DELETE_ITEM_ERROR,
  HUB_GET_LIST_SELECT,
  HUB_GET_LIST_SELECT_SUCCESS,
  HUB_GET_LIST_SELECT_ERROR
} from '../../../constants/actionTypes';

export const toggleHubModal = (hub = null) => ({
  type: HUB_TOGGLE_MODAL,
  payload: hub
})

export const getHubList = (params, history) => ({
  type: HUB_GET_LIST,
  payload: { params, history }
});

export const getHubListSuccess = (items) => ({
  type: HUB_GET_LIST_SUCCESS,
  payload: items
});

export const getHubListError = (error) => ({
  type: HUB_GET_LIST_ERROR,
  payload: error
});

export const addHubItem = (item, history) => ({
  type: HUB_ADD_ITEM,
  payload: { item, history }
});

export const addHubItemSuccess = () => ({
  type: HUB_ADD_ITEM_SUCCESS,
});

export const addHubItemError = (error) => ({
  type: HUB_ADD_ITEM_ERROR,
  payload: error
});

export const updateHubItem = (item, history) => ({
  type: HUB_UPDATE_ITEM,
  payload: { item, history }
});

export const updateHubItemSuccess = () => ({
  type: HUB_UPDATE_ITEM_SUCCESS,
});

export const updateHubItemError = (error) => ({
  type: HUB_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteHubItem = (item, history) => ({
  type: HUB_DELETE_ITEM,
  payload: { item, history }
});

export const deleteHubItemSuccess = () => ({
  type: HUB_DELETE_ITEM_SUCCESS,
});

export const deleteHubItemError = (error) => ({
  type: HUB_DELETE_ITEM_ERROR,
  payload: error
});

export const getHubListSelect = (params, history) => ({
  type: HUB_GET_LIST_SELECT,
  payload: { params, history }
});

export const getHubListSelectSuccess = (items) => ({
  type: HUB_GET_LIST_SELECT_SUCCESS,
  payload: items
});

export const getHubListSelectError = (error) => ({
  type: HUB_GET_LIST_SELECT_ERROR,
  payload: error
});