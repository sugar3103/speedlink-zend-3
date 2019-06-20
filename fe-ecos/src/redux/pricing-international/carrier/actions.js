import {
  PRI_INT_CARRIER_ERROR,

  PRI_INT_CARRIER_GET_LIST,
  PRI_INT_CARRIER_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const carrierInternationalError = (error) => ({
  type: PRI_INT_CARRIER_ERROR,
  payload: error
});

export const getCarrierInternationalList = (params) => ({
  type: PRI_INT_CARRIER_GET_LIST,
  payload: { params }
});

export const getCarrierInternationalListSuccess = (items) => ({
  type: PRI_INT_CARRIER_GET_LIST_SUCCESS,
  payload: { items }
});