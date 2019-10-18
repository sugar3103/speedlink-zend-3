import {
  PRI_DOM_CARRIER_ERROR,

  PRI_DOM_CARRIER_GET_LIST,
  PRI_DOM_CARRIER_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const carrierDomesticError = (error) => ({
  type: PRI_DOM_CARRIER_ERROR,
  payload: error
});

export const getCarrierDomesticList = (params) => ({
  type: PRI_DOM_CARRIER_GET_LIST,
  payload: { params }
});

export const getCarrierDomesticListSuccess = (items) => ({
  type: PRI_DOM_CARRIER_GET_LIST_SUCCESS,
  payload: { items }
});