import {
  PRICING_ERROR,

  PRICING_SALEMAN_GET_LIST,
  PRICING_SALEMAN_GET_LIST_SUCCESS,

  PRICING_CUSTOMER_GET_LIST,
  PRICING_CUSTOMER_GET_LIST_SUCCESS,

  PRICING_CARRIER_GET_LIST,
  PRICING_CARRIER_GET_LIST_SUCCESS,

  PRICING_GET_LIST,
  PRICING_GET_LIST_SUCCESS,

  PRICING_ADD_MASTER_DATA,
  PRICING_ADD_MASTER_DATA_SUCCESS,

} from '../../../constants/actionTypes';

export const pricingError = (error) => ({
  type: PRICING_ERROR,
  payload: error
});

/* GET LIST CUSTOMER */
export const getCustomerPricingList = (params, messages) => ({
  type: PRICING_CUSTOMER_GET_LIST,
  payload: { params, messages }
});

export const getCustomerPricingListSuccess = (customers) => ({
  type: PRICING_CUSTOMER_GET_LIST_SUCCESS,
  payload: customers
});

/* GET LIST SALEMAN */
export const getSalemanPricingList = (params, messages) => ({
  type: PRICING_SALEMAN_GET_LIST,
  payload: { params, messages }
});

export const getSalemanPricingListSuccess = (salemans) => ({
  type: PRICING_SALEMAN_GET_LIST_SUCCESS,
  payload: salemans
});

/* GET LIST CARRIER */
export const getCarrierPricingList = (params, messages) => ({
  type: PRICING_CARRIER_GET_LIST,
  payload: { params, messages }
});

export const getCarrierPricingListSuccess = (carriers) => ({
  type: PRICING_CARRIER_GET_LIST_SUCCESS,
  payload: carriers
});

/* GET LIST PRICING */
export const getPricingList = (params, messages) => ({
  type: PRICING_GET_LIST,
  payload: { params, messages }
});

export const getPricingListSuccess = (items, total) => ({
  type: PRICING_GET_LIST_SUCCESS,
  payload: { items, total }
});

/* ADD PRICING */
export const addPricingMasterDataItem = (item, messages) => ({
  type: PRICING_ADD_MASTER_DATA,
  payload: { item, messages }
});

export const addPricingMasterDataItemSuccess = () => ({
  type: PRICING_ADD_MASTER_DATA_SUCCESS,
});
