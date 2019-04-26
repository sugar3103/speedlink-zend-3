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

  PRICING_GET_DATA,
  PRICING_GET_DATA_SUCCESS,

  PRICING_UPDATE_DATA,
  PRICING_UPDATE_DATA_SUCCESS,
  
  PRICING_GET_VAS,
  PRICING_GET_VAS_SUCCESS,

  PRICING_UPDATE_VAS,
  PRICING_UPDATE_VAS_SUCCESS,

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

/* GET PRICING DATA */
export const getPricingData = (params, messages) => ({
  type: PRICING_GET_DATA,
  payload: { params, messages }
});

export const getPricingDataSuccess = (item) => ({
  type: PRICING_GET_DATA_SUCCESS,
  payload: item
});

/* UPDATE PRICING DATA */
export const updatePricingDataItem = (params, messages) => ({
  type: PRICING_UPDATE_DATA,
  payload: { params, messages }
});

export const updatePricingDataItemSuccess = () => ({
  type: PRICING_UPDATE_DATA_SUCCESS,
});

/* GET PRICING VAS */
export const getPricingVas = (params, messages) => ({
  type: PRICING_GET_VAS,
  payload: {params, messages}
});

export const getPricingVasSuccess = (vas) => ({
  type: PRICING_GET_VAS_SUCCESS,
  payload: vas
});

/* UPDATE PRICING VAS */
export const updatePricingVasItem = (params, messages) => ({
  type: PRICING_UPDATE_VAS,
  payload: { params, messages }
});

export const updatePricingVasItemSuccess = () => ({
  type: PRICING_UPDATE_VAS_SUCCESS,
});