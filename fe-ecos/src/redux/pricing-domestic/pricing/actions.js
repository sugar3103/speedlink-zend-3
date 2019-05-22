import {
  PRI_DOM_PRICING_ERROR,

  PRI_DOM_PRICING_GET_LIST,
  PRI_DOM_PRICING_GET_LIST_SUCCESS,

  PRI_DOM_PRICING_ADD_ITEM,
  PRI_DOM_PRICING_ADD_ITEM_SUCCESS,

  PRI_DOM_PRICING_REQUEST_UPDATE_ITEM,
  PRI_DOM_PRICING_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_DOM_PRICING_UPDATE_ITEM,
  PRI_DOM_PRICING_UPDATE_ITEM_SUCCESS,

  PRI_DOM_PRICING_DELETE_ITEM,
  PRI_DOM_PRICING_DELETE_ITEM_SUCCESS,

  PRI_DOM_PRICING_GET_DATA,
  PRI_DOM_PRICING_GET_DATA_SUCCESS,

  PRI_DOM_PRICING_ADD_RANGE_WEIGHT_VALUE,
  PRI_DOM_PRICING_ADD_RANGE_WEIGHT_VALUE_SUCCESS

} from '../../../constants/actionTypes';

export const pricingDomesticError = (error) => ({
  type: PRI_DOM_PRICING_ERROR,
  payload: error
});

export const getPricingDomesticList = (params) => ({
  type: PRI_DOM_PRICING_GET_LIST,
  payload: { params }
});

export const getPricingDomesticListSuccess = (items, total) => ({
  type: PRI_DOM_PRICING_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const addPricingDomesticItem = (item) => ({
  type: PRI_DOM_PRICING_ADD_ITEM,
  payload: { item }
});

export const addPricingDomesticItemSuccess = () => ({
  type: PRI_DOM_PRICING_ADD_ITEM_SUCCESS
});

export const requestUpdatePricingDomesticItem = (param) => ({
  type: PRI_DOM_PRICING_REQUEST_UPDATE_ITEM,
  payload: { param }
});

export const requestUpdatePricingDomesticItemSuccess = (data) => ({
  type: PRI_DOM_PRICING_REQUEST_UPDATE_ITEM_SUCCESS,
  payload: data
})

export const updatePricingDomesticItem = (item) => ({
  type: PRI_DOM_PRICING_UPDATE_ITEM,
  payload: { item }
});

export const updatePricingDomesticItemSuccess = () => ({
  type: PRI_DOM_PRICING_UPDATE_ITEM_SUCCESS
});

export const deletePricingDomesticItem = (ids) => ({
  type: PRI_DOM_PRICING_DELETE_ITEM,
  payload: { ids }
});

export const deletePricingDomesticItemSuccess = () => ({
  type: PRI_DOM_PRICING_DELETE_ITEM_SUCCESS,
});

export const getPricingDomesticData = (pricing_id) => ({
  type: PRI_DOM_PRICING_GET_DATA,
  payload: { pricing_id }
});

export const getPricingDomesticDataSuccess = (data) => ({
  type: PRI_DOM_PRICING_GET_DATA_SUCCESS,
  payload: data
});

export const addRangeWeightValue = (item, toggleModal) => ({
  type: PRI_DOM_PRICING_ADD_RANGE_WEIGHT_VALUE,
  payload: { item, toggleModal }
});

export const addRangeWeightValueSuccess = () => ({
  type: PRI_DOM_PRICING_ADD_RANGE_WEIGHT_VALUE_SUCCESS
});