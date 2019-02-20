import {
  ZONECODE_TOGGLE_MODAL,
  ZONECODE_GET_LIST,
  ZONECODE_GET_LIST_SUCCESS,
  ZONECODE_GET_LIST_ERROR,
  ZONECODE_ADD_ITEM,
  ZONECODE_ADD_ITEM_SUCCESS,
  ZONECODE_ADD_ITEM_ERROR,
  ZONECODE_UPDATE_ITEM,
  ZONECODE_UPDATE_ITEM_SUCCESS,
  ZONECODE_UPDATE_ITEM_ERROR,
  ZONECODE_DELETE_ITEM,
  ZONECODE_DELETE_ITEM_SUCCESS,
  ZONECODE_DELETE_ITEM_ERROR,
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
} from '../../../constants/actionTypes';

export const toggleZoneCodeModal = (zonecode = null) => ({
  type: ZONECODE_TOGGLE_MODAL,
  payload: zonecode
})

export const getZoneCodeList = (params, messages) => ({
  type: ZONECODE_GET_LIST,
  payload: { params, messages }
});

export const getZoneCodeListSuccess = (items, total) => ({
  type: ZONECODE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getZoneCodeListError = (error) => ({
  type: ZONECODE_GET_LIST_ERROR,
  payload: error
});

export const addZoneCodeItem = (item, messages) => ({
  type: ZONECODE_ADD_ITEM,
  payload: { item, messages }
});

export const addZoneCodeItemSuccess = () => ({
  type: ZONECODE_ADD_ITEM_SUCCESS,
});

export const addZoneCodeItemError = (error) => ({
  type: ZONECODE_ADD_ITEM_ERROR,
  payload: error
});

export const updateZoneCodeItem = (item, messages) => ({
  type: ZONECODE_UPDATE_ITEM,
  payload: { item, messages }
});

export const updateZoneCodeItemSuccess = () => ({
  type: ZONECODE_UPDATE_ITEM_SUCCESS,
});

export const updateZoneCodeItemError = (error) => ({
  type: ZONECODE_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteZoneCodeItem = (id, messages) => ({
  type: ZONECODE_DELETE_ITEM,
  payload: { id, messages }
});

export const deleteZoneCodeItemSuccess = () => ({
  type: ZONECODE_DELETE_ITEM_SUCCESS,
});

export const deleteZoneCodeItemError = (error) => ({
  type: ZONECODE_DELETE_ITEM_ERROR,
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

export const getOriginCityList = (params) => ({
  type: ORIGIN_CITY_GET_LIST,
  payload: { params }
});

export const getOriginCityListSuccess = (origin_city) => ({
  type: ORIGIN_CITY_GET_LIST_SUCCESS,
  payload: { origin_city }
});

export const getOriginCityListError = (error) => ({
  type: ORIGIN_CITY_GET_LIST_ERROR,
  payload: error
});

export const getOriginDistrictList = (params) => ({
  type: ORIGIN_DISTRICT_GET_LIST,
  payload: { params }
});

export const getOriginDistrictListSuccess = (origin_district) => ({
  type: ORIGIN_DISTRICT_GET_LIST_SUCCESS,
  payload: { origin_district }
});

export const getOriginDistrictListError = (error) => ({
  type: ORIGIN_DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const getOriginWardList = (params) => ({
  type: ORIGIN_WARD_GET_LIST,
  payload: { params }
});

export const getOriginWardListSuccess = (origin_ward) => ({
  type: ORIGIN_WARD_GET_LIST_SUCCESS,
  payload: { origin_ward }
});

export const getOriginWardListError = (error) => ({
  type: ORIGIN_WARD_GET_LIST_ERROR,
  payload: error
});

export const getDestinationCountryList = (params) => ({
  type: DESTINATION_COUNTRY_GET_LIST,
  payload: { params }
});

export const getDestinationCountryListSuccess = (destination_country) => ({
  type: DESTINATION_COUNTRY_GET_LIST_SUCCESS,
  payload: { destination_country }
});

export const getDestinationCountryListError = (error) => ({
  type: DESTINATION_COUNTRY_GET_LIST_ERROR,
  payload: error
});

export const getDestinationCityList = (params) => ({
  type: DESTINATION_CITY_GET_LIST,
  payload: { params }
});

export const getDestinationCityListSuccess = (destination_city) => ({
  type: DESTINATION_CITY_GET_LIST_SUCCESS,
  payload: { destination_city }
});

export const getDestinationCityListError = (error) => ({
  type: DESTINATION_CITY_GET_LIST_ERROR,
  payload: error
});

export const getDestinationDistrictList = (params) => ({
  type: DESTINATION_DISTRICT_GET_LIST,
  payload: { params }
});

export const getDestinationDistrictListSuccess = (destination_district) => ({
  type: DESTINATION_DISTRICT_GET_LIST_SUCCESS,
  payload: { destination_district }
});

export const getDestinationDistrictListError = (error) => ({
  type: DESTINATION_DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const getDestinationWardList = (params) => ({
  type: DESTINATION_WARD_GET_LIST,
  payload: { params }
});

export const getDestinationWardListSuccess = (destination_ward) => ({
  type: DESTINATION_WARD_GET_LIST_SUCCESS,
  payload: { destination_ward }
});

export const getDestinationWardListError = (error) => ({
  type: DESTINATION_WARD_GET_LIST_ERROR,
  payload: error
});