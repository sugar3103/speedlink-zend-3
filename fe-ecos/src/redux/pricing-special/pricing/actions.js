import {
  PRI_SPECIAL_PRICING_ERROR,

  PRI_SPECIAL_PRICING_GET_LIST,
  PRI_SPECIAL_PRICING_GET_LIST_SUCCESS,

  PRI_SPECIAL_PRICING_ADD_ITEM,
  PRI_SPECIAL_PRICING_ADD_ITEM_SUCCESS,

  PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM,
  PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_PRICING_UPDATE_ITEM,
  PRI_SPECIAL_PRICING_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_PRICING_DELETE_ITEM,
  PRI_SPECIAL_PRICING_DELETE_ITEM_SUCCESS,

  PRI_SPECIAL_PRICING_GET_DATA,
  PRI_SPECIAL_PRICING_GET_DATA_SUCCESS,

  PRI_SPECIAL_PRICING_ADD_RANGE_WEIGHT_VALUE,
  PRI_SPECIAL_PRICING_ADD_RANGE_WEIGHT_VALUE_SUCCESS,

  PRI_SPECIAL_PRICING_GET_VAS,
  PRI_SPECIAL_PRICING_GET_VAS_SUCCESS,

  PRI_SPECIAL_PRICING_UPDATE_VAS,
  PRI_SPECIAL_PRICING_UPDATE_VAS_SUCCESS,

  PRI_SPECIAL_PRICING_GET_FIELD_VAS,
  PRI_SPECIAL_PRICING_GET_FIELD_VAS_SUCCESS,

} from '../../../constants/actionTypes';

export const pricingSpecialError = (error) => ({
  type: PRI_SPECIAL_PRICING_ERROR,
  payload: error
});

export const getPricingSpecialList = (params) => ({
  type: PRI_SPECIAL_PRICING_GET_LIST,
  payload: { params }
});

export const getPricingSpecialListSuccess = (items, total) => ({
  type: PRI_SPECIAL_PRICING_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addPricingSpecialItem = (item) => ({
  type: PRI_SPECIAL_PRICING_ADD_ITEM,
  payload: { item }
});

export const addPricingSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_PRICING_ADD_ITEM_SUCCESS
});

export const requestUpdatePricingSpecialItem = (param) => ({
  type: PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM,
  payload: { param }
});

export const requestUpdatePricingSpecialItemSuccess = (data) => ({
  type: PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM_SUCCESS,
  payload: data
})

export const updatePricingSpecialItem = (item) => ({
  type: PRI_SPECIAL_PRICING_UPDATE_ITEM,
  payload: { item }
});

export const updatePricingSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_PRICING_UPDATE_ITEM_SUCCESS
});

export const deletePricingSpecialItem = (ids) => ({
  type: PRI_SPECIAL_PRICING_DELETE_ITEM,
  payload: { ids }
});

export const deletePricingSpecialItemSuccess = () => ({
  type: PRI_SPECIAL_PRICING_DELETE_ITEM_SUCCESS,
});

export const getPricingSpecialData = (pricing_id) => ({
  type: PRI_SPECIAL_PRICING_GET_DATA,
  payload: { pricing_id }
});

export const getPricingSpecialDataSuccess = (data) => ({
  type: PRI_SPECIAL_PRICING_GET_DATA_SUCCESS,
  payload: data
});

export const addRangeWeightSpecialValue = (item, toggleModal) => ({
  type: PRI_SPECIAL_PRICING_ADD_RANGE_WEIGHT_VALUE,
  payload: { item, toggleModal }
});

export const addRangeWeightSpecialValueSuccess = () => ({
  type: PRI_SPECIAL_PRICING_ADD_RANGE_WEIGHT_VALUE_SUCCESS
});

export const getPricingSpecialVas = (pricing_id) => ({
  type: PRI_SPECIAL_PRICING_GET_VAS,
  payload: { pricing_id }
});

export const getPricingSpecialVasSuccess = (data) => ({
  type: PRI_SPECIAL_PRICING_GET_VAS_SUCCESS,
  payload: data
});

export const updatePricingSpecialVas = (item) => ({
  type: PRI_SPECIAL_PRICING_UPDATE_VAS,
  payload: { item }
});

export const updatePricingSpecialVasSuccess = () => ({
  type: PRI_SPECIAL_PRICING_UPDATE_VAS_SUCCESS
});

export const getPricingSpecialFieldVas = () => ({
  type: PRI_SPECIAL_PRICING_GET_FIELD_VAS,
});

export const getPricingSpecialFieldVasSuccess = (data) => ({
  type: PRI_SPECIAL_PRICING_GET_FIELD_VAS_SUCCESS,
  payload: data
});