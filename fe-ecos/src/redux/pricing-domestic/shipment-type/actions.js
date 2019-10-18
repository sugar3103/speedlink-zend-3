import {
  PRI_DOM_SHIPMENT_TYPE_ERROR,

  PRI_DOM_SHIPMENT_TYPE_GET_LIST,
  PRI_DOM_SHIPMENT_TYPE_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const shipmentTypeDomesticError = (error) => ({
  type: PRI_DOM_SHIPMENT_TYPE_ERROR,
  payload: error
});

export const getShipmentTypeDomesticList = (params) => ({
  type: PRI_DOM_SHIPMENT_TYPE_GET_LIST,
  payload: { params }
});

export const getShipmentTypeDomesticListSuccess = (items) => ({
  type: PRI_DOM_SHIPMENT_TYPE_GET_LIST_SUCCESS,
  payload: { items }
});