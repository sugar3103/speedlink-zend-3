import {
  PRI_INT_PRICING_ERROR,

  PRI_INT_PRICING_GET_LIST,
  PRI_INT_PRICING_GET_LIST_SUCCESS,

  PRI_INT_PRICING_ADD_ITEM,
  PRI_INT_PRICING_ADD_ITEM_SUCCESS,

  PRI_INT_PRICING_REQUEST_UPDATE_ITEM,
  PRI_INT_PRICING_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_INT_PRICING_UPDATE_ITEM,
  PRI_INT_PRICING_UPDATE_ITEM_SUCCESS,

  PRI_INT_PRICING_DELETE_ITEM,
  PRI_INT_PRICING_DELETE_ITEM_SUCCESS,

  PRI_INT_PRICING_GET_DATA,
  PRI_INT_PRICING_GET_DATA_SUCCESS,

  PRI_INT_PRICING_GET_VAS,
  PRI_INT_PRICING_GET_VAS_SUCCESS,

  PRI_INT_PRICING_UPDATE_VAS,
  PRI_INT_PRICING_UPDATE_VAS_SUCCESS,

  PRI_INT_PRICING_GET_FIELD_VAS,
  PRI_INT_PRICING_GET_FIELD_VAS_SUCCESS,

} from '../../../constants/actionTypes';

export const pricingInternationalError = (error) => ({
  type: PRI_INT_PRICING_ERROR,
  payload: error
});

export const getPricingInternationalList = (params) => ({
  type: PRI_INT_PRICING_GET_LIST,
  payload: { params }
});

export const getPricingInternationalListSuccess = (items, total) => ({
  type: PRI_INT_PRICING_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addPricingInternationalItem = (item) => ({
  type: PRI_INT_PRICING_ADD_ITEM,
  payload: { item }
});

export const addPricingInternationalItemSuccess = () => ({
  type: PRI_INT_PRICING_ADD_ITEM_SUCCESS
});

export const requestUpdatePricingInternationalItem = (param) => ({
  type: PRI_INT_PRICING_REQUEST_UPDATE_ITEM,
  payload: { param }
});

export const requestUpdatePricingInternationalItemSuccess = (data) => ({
  type: PRI_INT_PRICING_REQUEST_UPDATE_ITEM_SUCCESS,
  payload: data
})

export const updatePricingInternationalItem = (item) => ({
  type: PRI_INT_PRICING_UPDATE_ITEM,
  payload: { item }
});

export const updatePricingInternationalItemSuccess = () => ({
  type: PRI_INT_PRICING_UPDATE_ITEM_SUCCESS
});

export const deletePricingInternationalItem = (ids) => ({
  type: PRI_INT_PRICING_DELETE_ITEM,
  payload: { ids }
});

export const deletePricingInternationalItemSuccess = () => ({
  type: PRI_INT_PRICING_DELETE_ITEM_SUCCESS,
});

export const getPricingInternationalData = (pricing_id) => ({
  type: PRI_INT_PRICING_GET_DATA,
  payload: { pricing_id }
});

export const getPricingInternationalDataSuccess = (data) => ({
  type: PRI_INT_PRICING_GET_DATA_SUCCESS,
  payload: data
});

export const getPricingInternationalVas = (pricing_id) => ({
  type: PRI_INT_PRICING_GET_VAS,
  payload: { pricing_id }
});

export const getPricingInternationalVasSuccess = (data) => ({
  type: PRI_INT_PRICING_GET_VAS_SUCCESS,
  payload: data
});

export const updatePricingInternationalVas = (item) => ({
  type: PRI_INT_PRICING_UPDATE_VAS,
  payload: { item }
});

export const updatePricingInternationalVasSuccess = () => ({
  type: PRI_INT_PRICING_UPDATE_VAS_SUCCESS
});

export const getPricingInternationalFieldVas = () => ({
  type: PRI_INT_PRICING_GET_FIELD_VAS,
});

export const getPricingInternationalFieldVasSuccess = (data) => ({
  type: PRI_INT_PRICING_GET_FIELD_VAS_SUCCESS,
  payload: data
});