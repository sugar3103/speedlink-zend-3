import {
  SHIPMENT_TYPE_TOGGLE_MODAL,
  SHIPMENT_TYPE_CHANGE_TYPE_MODAL,

  SHIPMENT_TYPE_GET_LIST,
  SHIPMENT_TYPE_GET_LIST_SUCCESS,
  SHIPMENT_TYPE_GET_LIST_ERROR,

  SHIPMENT_TYPE_ADD_ITEM,
  SHIPMENT_TYPE_ADD_ITEM_SUCCESS,
  SHIPMENT_TYPE_ADD_ITEM_ERROR,

  SHIPMENT_TYPE_UPDATE_ITEM,
  SHIPMENT_TYPE_UPDATE_ITEM_SUCCESS,
  SHIPMENT_TYPE_UPDATE_ITEM_ERROR,

  SHIPMENT_TYPE_DELETE_ITEM,
  SHIPMENT_TYPE_DELETE_ITEM_SUCCESS,
  SHIPMENT_TYPE_DELETE_ITEM_ERROR,

  SHIPMENT_TYPE_CODE_GET_LIST,
  SHIPMENT_TYPE_CODE_GET_LIST_SUCCESS,
  SHIPMENT_TYPE_CODE_GET_LIST_ERROR,

  SHIPMENT_TYPE_CARRIER_GET_LIST,
  SHIPMENT_TYPE_CARRIER_GET_LIST_SUCCESS,
  SHIPMENT_TYPE_CARRIER_GET_LIST_ERROR

} from '../../../../constants/actionTypes';

export const toggleShipmentTypeModal = (type, data) => ({
  type: SHIPMENT_TYPE_TOGGLE_MODAL,
  payload: { type, data}
});

export const getShipmentTypeList = (params) => ({
  type: SHIPMENT_TYPE_GET_LIST,
  payload: { params }
});

export const getShipmentTypeListSuccess = (items, total) => ({
  type: SHIPMENT_TYPE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getShipmentTypeListError = (error) => ({
  type: SHIPMENT_TYPE_GET_LIST_ERROR,
  payload: error
});

export const getShipmentTypeCodeList = () => ({
  type: SHIPMENT_TYPE_CODE_GET_LIST,
  payload: { }
});

export const getShipmentTypeCodeListSuccess = (codes) => ({
  type: SHIPMENT_TYPE_CODE_GET_LIST_SUCCESS,
  payload: { codes }
});

export const getShipmentTypeCodeListError = (error) => ({
  type: SHIPMENT_TYPE_CODE_GET_LIST_ERROR,
  payload: error
});

export const addShipmentTypeItem = (item, messages) => ({
  type: SHIPMENT_TYPE_ADD_ITEM,
  payload: { item, messages }
});

export const addShipmentTypeItemSuccess = () => ({
  type: SHIPMENT_TYPE_ADD_ITEM_SUCCESS,
});

export const addShipmentTypeItemError = (error) => ({
  type: SHIPMENT_TYPE_ADD_ITEM_ERROR,
  payload: error
});

export const updateShipmentTypeItem = (item, messages) => ({
  type: SHIPMENT_TYPE_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateShipmentTypeItemSuccess = () => ({
  type: SHIPMENT_TYPE_UPDATE_ITEM_SUCCESS,
});

export const updateShipmentTypeItemError = (error) => ({
  type: SHIPMENT_TYPE_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteShipmentTypeItem = (id, messages) => ({
  type: SHIPMENT_TYPE_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteShipmentTypeItemSuccess = () => ({
  type: SHIPMENT_TYPE_DELETE_ITEM_SUCCESS,
});

export const deleteShipmentTypeItemError = (error) => ({
  type: SHIPMENT_TYPE_DELETE_ITEM_ERROR,
  payload: error
});

export const changeTypeShipmentTypeModal = (type) => ({
  type: SHIPMENT_TYPE_CHANGE_TYPE_MODAL,
  payload: type
})

/* GET LIST CARRIER OF SHIPMENT TYPE */
export const getCarrierShipmentList = (params, messages) => ({
  type: SHIPMENT_TYPE_CARRIER_GET_LIST,
  payload: { params, messages }
});

export const getCarrierShipmentListSuccess = (carriers) => ({
  type: SHIPMENT_TYPE_CARRIER_GET_LIST_SUCCESS,
  payload: carriers
});

export const getCarrierShipmentListError = (error) => ({
  type: SHIPMENT_TYPE_CARRIER_GET_LIST_ERROR,
  payload: error
});



