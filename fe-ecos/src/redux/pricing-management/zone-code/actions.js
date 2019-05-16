import {
  ZONE_CODE_TOGGLE_MODAL,
  ZONE_CODE_GET_LIST,
  ZONE_CODE_GET_LIST_SUCCESS,
  ZONE_CODE_GET_LIST_ERROR,
  ZONE_CODE_ADD_ITEM,
  ZONE_CODE_ADD_ITEM_SUCCESS,
  ZONE_CODE_ADD_ITEM_ERROR,
  ZONE_CODE_UPDATE_ITEM,
  ZONE_CODE_UPDATE_ITEM_SUCCESS,
  ZONE_CODE_UPDATE_ITEM_ERROR,
  ZONE_CODE_DELETE_ITEM,
  ZONE_CODE_DELETE_ITEM_SUCCESS,
  ZONE_CODE_DELETE_ITEM_ERROR,
  DESTINATION_COUNTRY_GET_LIST,
  DESTINATION_COUNTRY_GET_LIST_SUCCESS,
  DESTINATION_COUNTRY_GET_LIST_ERROR,
  DESTINATION_CITY_GET_LIST,
  DESTINATION_CITY_GET_LIST_SUCCESS,
  DESTINATION_CITY_GET_LIST_ERROR,
  DESTINATION_DISTRICT_GET_LIST,
  DESTINATION_DISTRICT_GET_LIST_SUCCESS,
  DESTINATION_DISTRICT_GET_LIST_ERROR,
  DESTINATION_WARD_GET_LIST,
  DESTINATION_WARD_GET_LIST_SUCCESS,
  DESTINATION_WARD_GET_LIST_ERROR,
  ZONE_CODE_CHANGE_TYPE_MODAL,
  CARRIER_GET_CODE_ZONE_CODE_BY_CONDITION, 
  CARRIER_GET_CODE_ZONE_CODE_BY_CONDITION_SUCCESS,
  CARRIER_GET_CODE_ZONE_CODE_BY_CONDITION_ERROR, 

  SERVICE_GET_CODE_ZONE_CODE_BY_CONDITION, 
  SERVICE_GET_CODE_ZONE_CODE_BY_CONDITION_SUCCESS, 
  SERVICE_GET_CODE_ZONE_CODE_BY_CONDITION_ERROR,

  SHIPMENT_TYPE_GET_CODE_ZONE_CODE_BY_CONDITION,
  SHIPMENT_TYPE_GET_CODE_ZONE_CODE_BY_CONDITION_SUCCESS,
  SHIPMENT_TYPE_GET_CODE_ZONE_CODE_BY_CONDITION_ERROR
} from '../../../constants/actionTypes';

export const toggleZoneCodeModal = (type, data) => ({
  type: ZONE_CODE_TOGGLE_MODAL,
  payload: { type, data }
})

export const changeTypeZoneCodeModal = (type) => ({
  type: ZONE_CODE_CHANGE_TYPE_MODAL,
  payload: type
})

export const getZoneCodeList = (params) => ({
  type: ZONE_CODE_GET_LIST,
  payload: { params }
});

export const getZoneCodeListSuccess = (items, total) => ({
  type: ZONE_CODE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getZoneCodeListError = (error) => ({
  type: ZONE_CODE_GET_LIST_ERROR,
  payload: error
});

export const addZoneCodeItem = (item) => ({
  type: ZONE_CODE_ADD_ITEM,
  payload: { item }
});

export const addZoneCodeItemSuccess = () => ({
  type: ZONE_CODE_ADD_ITEM_SUCCESS,
});

export const addZoneCodeItemError = (error) => ({
  type: ZONE_CODE_ADD_ITEM_ERROR,
  payload: error
});

export const updateZoneCodeItem = (item) => ({
  type: ZONE_CODE_UPDATE_ITEM,
  payload: { item }
});

export const updateZoneCodeItemSuccess = () => ({
  type: ZONE_CODE_UPDATE_ITEM_SUCCESS,
});

export const updateZoneCodeItemError = (error) => ({
  type: ZONE_CODE_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteZoneCodeItem = (ids) => ({
  type: ZONE_CODE_DELETE_ITEM,
  payload: { ids }
});

export const deleteZoneCodeItemSuccess = () => ({
  type: ZONE_CODE_DELETE_ITEM_SUCCESS,
});

export const deleteZoneCodeItemError = (error) => ({
  type: ZONE_CODE_DELETE_ITEM_ERROR,
  payload: error
});

export const getDestinationCountryList = (params, types) => ({
  type: DESTINATION_COUNTRY_GET_LIST,
  payload: { params, types }
});

export const getDestinationCountryListSuccess = (destination_country, types) => ({
  type: DESTINATION_COUNTRY_GET_LIST_SUCCESS,
  payload: { destination_country, types }
});

export const getDestinationCountryListError = (error) => ({
  type: DESTINATION_COUNTRY_GET_LIST_ERROR,
  payload: error
});

export const getDestinationCityList = (params, types) => ({
  type: DESTINATION_CITY_GET_LIST,
  payload: { params, types }
});

export const getDestinationCityListSuccess = (destination_city, types) => ({
  type: DESTINATION_CITY_GET_LIST_SUCCESS,
  payload: { destination_city, types }
});

export const getDestinationCityListError = (error) => ({
  type: DESTINATION_CITY_GET_LIST_ERROR,
  payload: error
});

export const getDestinationDistrictList = (params, types) => ({
  type: DESTINATION_DISTRICT_GET_LIST,
  payload: { params, types }
});

export const getDestinationDistrictListSuccess = (destination_district, types) => ({
  type: DESTINATION_DISTRICT_GET_LIST_SUCCESS,
  payload: { destination_district, types }
});

export const getDestinationDistrictListError = (error) => ({
  type: DESTINATION_DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const getDestinationWardList = (params, types) => ({
  type: DESTINATION_WARD_GET_LIST,
  payload: { params, types }
});

export const getDestinationWardListSuccess = (destination_ward, types) => ({
  type: DESTINATION_WARD_GET_LIST_SUCCESS,
  payload: { destination_ward, types }
});

export const getDestinationWardListError = (error) => ({
  type: DESTINATION_WARD_GET_LIST_ERROR,
  payload: error
});

export const getCarrierCodeZoneCodeByCondition = (params, types) => ({
  type: CARRIER_GET_CODE_ZONE_CODE_BY_CONDITION,
  payload: { params, types }
});

export const getCarrierCodeZoneCodeByConditionSuccess = ( CarrierCodeZoneCodeByCondition) => ({
  type: CARRIER_GET_CODE_ZONE_CODE_BY_CONDITION_SUCCESS,
  payload: { CarrierCodeZoneCodeByCondition }
});

export const getCarrierCodeZoneCodeByConditionError = (error) => ({
  type: CARRIER_GET_CODE_ZONE_CODE_BY_CONDITION_ERROR,
  payload: error
});

export const getServiceCodeZoneCodeByCondition = (params, types) => ({
  type: SERVICE_GET_CODE_ZONE_CODE_BY_CONDITION,
  payload: { params, types }
});

export const getServiceCodeZoneCodeByConditionSuccess = (ServiceCodeZoneCodeByCondition) => ({
  type: SERVICE_GET_CODE_ZONE_CODE_BY_CONDITION_SUCCESS,
  payload: { ServiceCodeZoneCodeByCondition }
});

export const getServiceCodeZoneCodeByConditionError = (error) => ({
  type: SERVICE_GET_CODE_ZONE_CODE_BY_CONDITION_ERROR,
  payload: error
});

export const getShipmentTypeCodeZoneCodeByCondition = (params, types) => ({
  type: SHIPMENT_TYPE_GET_CODE_ZONE_CODE_BY_CONDITION,
  payload: { params, types }
});

export const getShipmentTypeCodeZoneCodeByConditionSuccess = (ShipmentCodeZoneCodeByCondition) => ({
  type: SHIPMENT_TYPE_GET_CODE_ZONE_CODE_BY_CONDITION_SUCCESS,
  payload: { ShipmentCodeZoneCodeByCondition }
});

export const getShipmentTypeCodeZoneCodeByConditionError = (error) => ({
  type: SHIPMENT_TYPE_GET_CODE_ZONE_CODE_BY_CONDITION_ERROR,
  payload: error
});