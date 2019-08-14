import {
  PRI_SPECIAL_CARRIER_ERROR,

  PRI_SPECIAL_CARRIER_GET_LIST,
  PRI_SPECIAL_CARRIER_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const carrierSpecialError = (error) => ({
  type: PRI_SPECIAL_CARRIER_ERROR,
  payload: error
});

export const getCarrierSpecialList = (params) => ({
  type: PRI_SPECIAL_CARRIER_GET_LIST,
  payload: { params }
});

export const getCarrierSpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_CARRIER_GET_LIST_SUCCESS,
  payload: { items }
});