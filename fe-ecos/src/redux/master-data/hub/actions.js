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
  HUB_CHANGE_TYPE_MODAL,
  HUB_COUNTRY_GET_LIST,
  HUB_COUNTRY_GET_LIST_SUCCESS,
  HUB_COUNTRY_GET_LIST_ERROR,
  HUB_CITY_GET_LIST,
  HUB_CITY_GET_LIST_SUCCESS,
  HUB_CITY_GET_LIST_ERROR,
} from '../../../constants/actionTypes';

export const toggleHubModal = (type, data) => ({
  type: HUB_TOGGLE_MODAL,
  payload: { type, data }
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

export const deleteHubItem = (ids, messages) => ({
  type: HUB_DELETE_ITEM,
  payload: { ids, messages }
});

export const deleteHubItemSuccess = () => ({
  type: HUB_DELETE_ITEM_SUCCESS,
});

export const deleteHubItemError = (error) => ({
  type: HUB_DELETE_ITEM_ERROR,
  payload: error
});

export const changeTypeHubModal = (type) => ({
  type: HUB_CHANGE_TYPE_MODAL,
  payload: type
})

export const getCountryHubList = (params, messages, types) => ({
  type: HUB_COUNTRY_GET_LIST,
  payload: { params, messages, types }
});

export const getCountryHubListSuccess = ( country_hub) => ({
  type: HUB_COUNTRY_GET_LIST_SUCCESS,
  payload: { country_hub }
});

export const getCountryHubListError = (error) => ({
  type: HUB_COUNTRY_GET_LIST_ERROR,
  payload: error
});

export const getCityHubList = (params, messages, types) => ({
  type: HUB_CITY_GET_LIST,
  payload: { params, messages, types }
});

export const getCityHubListSuccess = (city_hub) => ({
  type: HUB_CITY_GET_LIST_SUCCESS,
  payload: { city_hub }
});

export const getCityHubListError = (error) => ({
  type: HUB_CITY_GET_LIST_ERROR,
  payload: error
});