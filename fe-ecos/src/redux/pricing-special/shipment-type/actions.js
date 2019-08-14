import {
  PRI_SPECIAL_SHIPMENT_TYPE_ERROR,

  PRI_SPECIAL_SHIPMENT_TYPE_GET_LIST,
  PRI_SPECIAL_SHIPMENT_TYPE_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const shipmentTypeSpecialError = (error) => ({
  type: PRI_SPECIAL_SHIPMENT_TYPE_ERROR,
  payload: error
});

export const getShipmentTypeSpecialList = (params) => ({
  type: PRI_SPECIAL_SHIPMENT_TYPE_GET_LIST,
  payload: { params }
});

export const getShipmentTypeSpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_SHIPMENT_TYPE_GET_LIST_SUCCESS,
  payload: { items }
});