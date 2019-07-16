import {
  PRI_INT_SHIPMENT_TYPE_ERROR,

  PRI_INT_SHIPMENT_TYPE_GET_LIST,
  PRI_INT_SHIPMENT_TYPE_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const shipmentTypeInternationalError = (error) => ({
  type: PRI_INT_SHIPMENT_TYPE_ERROR,
  payload: error
});

export const getShipmentTypeInternationalList = (params) => ({
  type: PRI_INT_SHIPMENT_TYPE_GET_LIST,
  payload: { params }
});

export const getShipmentTypeInternationalListSuccess = (items) => ({
  type: PRI_INT_SHIPMENT_TYPE_GET_LIST_SUCCESS,
  payload: { items }
});