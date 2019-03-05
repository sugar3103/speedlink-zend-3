import {
  COUNTRY_TOGGLE_MODAL,
  COUNTRY_GET_LIST,
  COUNTRY_GET_LIST_SUCCESS,
  COUNTRY_GET_LIST_ERROR,
  COUNTRY_ADD_ITEM,
  COUNTRY_ADD_ITEM_SUCCESS,
  COUNTRY_ADD_ITEM_ERROR,
  COUNTRY_UPDATE_ITEM,
  COUNTRY_UPDATE_ITEM_SUCCESS,
  COUNTRY_UPDATE_ITEM_ERROR,
  COUNTRY_DELETE_ITEM,
  COUNTRY_DELETE_ITEM_SUCCESS,
  COUNTRY_DELETE_ITEM_ERROR,
  COUNTRY_CHANGE_TYPE_MODAL
} from '../../../../constants/actionTypes';

export const toggleCountryModal = (type, data) => ({
  type: COUNTRY_TOGGLE_MODAL,
  payload: { type, data }
})

export const getCountryList = (params, messages) => ({
  type: COUNTRY_GET_LIST,
  payload: { params, messages }
});

export const getCountryListSuccess = (items, total) => ({
  type: COUNTRY_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getCountryListError = (error) => ({
  type: COUNTRY_GET_LIST_ERROR,
  payload: error
});

export const addCountryItem = (item, messages) => ({
  type: COUNTRY_ADD_ITEM,
  payload: { item, messages }
});

export const addCountryItemSuccess = () => ({
  type: COUNTRY_ADD_ITEM_SUCCESS,
});

export const addCountryItemError = (error) => ({
  type: COUNTRY_ADD_ITEM_ERROR,
  payload: error
});

export const updateCountryItem = (item, messages) => ({
  type: COUNTRY_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateCountryItemSuccess = () => ({
  type: COUNTRY_UPDATE_ITEM_SUCCESS,
});

export const updateCountryItemError = (error) => ({
  type: COUNTRY_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteCountryItem = (id, messages) => ({
  type: COUNTRY_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteCountryItemSuccess = () => ({
  type: COUNTRY_DELETE_ITEM_SUCCESS,
});

export const deleteCountryItemError = (error) => ({
  type: COUNTRY_DELETE_ITEM_ERROR,
  payload: error
});

export const changeTypeCountryModal = (type) => ({
  type: COUNTRY_CHANGE_TYPE_MODAL,
  payload: type
})