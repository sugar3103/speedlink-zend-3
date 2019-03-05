import {
  CITY_TOGGLE_MODAL,
  CITY_GET_LIST,
  CITY_GET_LIST_SUCCESS,
  CITY_GET_LIST_ERROR,
  CITY_ADD_ITEM,
  CITY_ADD_ITEM_SUCCESS,
  CITY_ADD_ITEM_ERROR,
  CITY_UPDATE_ITEM,
  CITY_UPDATE_ITEM_SUCCESS,
  CITY_UPDATE_ITEM_ERROR,
  CITY_DELETE_ITEM,
  CITY_DELETE_ITEM_SUCCESS,
  CITY_DELETE_ITEM_ERROR,
  CITY_CHANGE_TYPE_MODAL
} from '../../../../constants/actionTypes';

export const toggleCityModal = (type, data) => ({
  type: CITY_TOGGLE_MODAL,
  payload: { type, data }
})

export const getCityList = (params, messages) => ({
  type: CITY_GET_LIST,
  payload: { params, messages }
});

export const getCityListSuccess = (items, total) => ({
  type: CITY_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getCityListError = (error) => ({
  type: CITY_GET_LIST_ERROR,
  payload: error
});

export const addCityItem = (item, messages) => ({
  type: CITY_ADD_ITEM,
  payload: { item, messages }
});

export const addCityItemSuccess = () => ({
  type: CITY_ADD_ITEM_SUCCESS,
});

export const addCityItemError = (error) => ({
  type: CITY_ADD_ITEM_ERROR,
  payload: error
});

export const updateCityItem = (item, messages) => ({
  type: CITY_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateCityItemSuccess = () => ({
  type: CITY_UPDATE_ITEM_SUCCESS,
});

export const updateCityItemError = (error) => ({
  type: CITY_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteCityItem = (id, messages) => ({
  type: CITY_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteCityItemSuccess = () => ({
  type: CITY_DELETE_ITEM_SUCCESS,
});

export const deleteCityItemError = (error) => ({
  type: CITY_DELETE_ITEM_ERROR,
  payload: error
});

export const changeTypeCityModal = (type) => ({
  type: CITY_CHANGE_TYPE_MODAL,
  payload: type
})