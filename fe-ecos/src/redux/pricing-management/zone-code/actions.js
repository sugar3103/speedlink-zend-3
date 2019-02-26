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
  ORIGIN_COUNTRY_GET_LIST,
  ORIGIN_COUNTRY_GET_LIST_SUCCESS,
  ORIGIN_COUNTRY_GET_LIST_ERROR,
  ORIGIN_CITY_GET_LIST,
  ORIGIN_CITY_GET_LIST_SUCCESS,
  ORIGIN_CITY_GET_LIST_ERROR,
  ORIGIN_DISTRICT_GET_LIST,
  ORIGIN_DISTRICT_GET_LIST_SUCCESS,
  ORIGIN_DISTRICT_GET_LIST_ERROR,
  ORIGIN_WARD_GET_LIST,
  ORIGIN_WARD_GET_LIST_SUCCESS,
  ORIGIN_WARD_GET_LIST_ERROR,
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
  ZONE_CODE_CHANGE_TYPE_MODAL
} from '../../../constants/actionTypes';

export const toggleZoneCodeModal = (type, data) => ({
  type: ZONE_CODE_TOGGLE_MODAL,
  payload: { type, data }
})

export const changeTypeZoneCodeModal = (type) => ({
  type: ZONE_CODE_CHANGE_TYPE_MODAL,
  payload: type
})

export const getZoneCodeList = (params, messages) => ({
  type: ZONE_CODE_GET_LIST,
  payload: { params, messages }
});

export const getZoneCodeListSuccess = (items, total) => ({
  type: ZONE_CODE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getZoneCodeListError = (error) => ({
  type: ZONE_CODE_GET_LIST_ERROR,
  payload: error
});

export const addZoneCodeItem = (item, messages) => ({
  type: ZONE_CODE_ADD_ITEM,
  payload: { item, messages }
});

export const addZoneCodeItemSuccess = () => ({
  type: ZONE_CODE_ADD_ITEM_SUCCESS,
});

export const addZoneCodeItemError = (error) => ({
  type: ZONE_CODE_ADD_ITEM_ERROR,
  payload: error
});

export const updateZoneCodeItem = (item, messages) => ({
  type: ZONE_CODE_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateZoneCodeItemSuccess = () => ({
  type: ZONE_CODE_UPDATE_ITEM_SUCCESS,
});

export const updateZoneCodeItemError = (error) => ({
  type: ZONE_CODE_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteZoneCodeItem = (id, messages) => ({
  type: ZONE_CODE_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteZoneCodeItemSuccess = () => ({
  type: ZONE_CODE_DELETE_ITEM_SUCCESS,
});

export const deleteZoneCodeItemError = (error) => ({
  type: ZONE_CODE_DELETE_ITEM_ERROR,
  payload: error
});

export const getOriginCountryList = (params) => ({
  type: ORIGIN_COUNTRY_GET_LIST,
  payload: { params }
});

export const getOriginCountryListSuccess = (origin_country) => ({
  type: ORIGIN_COUNTRY_GET_LIST_SUCCESS,
  payload: { origin_country }
});

export const getOriginCountryListError = (error) => ({
  type: ORIGIN_COUNTRY_GET_LIST_ERROR,
  payload: error
});

export const getOriginCityList = (params, types) => ({
  type: ORIGIN_CITY_GET_LIST,
  payload: { params, types }
});

export const getOriginCityListSuccess = (origin_city, types) => ({
  type: ORIGIN_CITY_GET_LIST_SUCCESS,
  payload: { origin_city, types }
});

export const getOriginCityListError = (error) => ({
  type: ORIGIN_CITY_GET_LIST_ERROR,
  payload: error
});

export const getOriginDistrictList = (params, types) => ({
  type: ORIGIN_DISTRICT_GET_LIST,
  payload: { params, types }
});

export const getOriginDistrictListSuccess = (origin_district, types) => ({
  type: ORIGIN_DISTRICT_GET_LIST_SUCCESS,
  payload: { origin_district, types }
});

export const getOriginDistrictListError = (error) => ({
  type: ORIGIN_DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const getOriginWardList = (params, types) => ({
  type: ORIGIN_WARD_GET_LIST,
  payload: { params, types }
});

export const getOriginWardListSuccess = (origin_ward, types) => ({
  type: ORIGIN_WARD_GET_LIST_SUCCESS,
  payload: { origin_ward, types }
});

export const getOriginWardListError = (error) => ({
  type: ORIGIN_WARD_GET_LIST_ERROR,
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