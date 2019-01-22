import {
  ADDRESS_GET_LIST,
  ADDRESS_GET_LIST_SUCCESS,
  ADDRESS_GET_LIST_ERROR,

  COUNTRY_TOGGLE_MODAL,
  COUNTRY_GET_LIST,
  COUNTRY_GET_LIST_SUCCESS,
  COUNTRY_GET_LIST_ERROR,
  COUNTRY_ADD_ITEM,
  COUNTRY_ADD_ITEM_SUCCESS,
  COUNTRY_ADD_ITEM_ERROR,
  COUNTRY_UPDATE_ITEM,
  COUNTRY_UPDATE_ITEM_SUCCESS,
  COUNTRY_UPDATE_ITEM_ERROR,
  COUNTRY_GET_LIST_SELECT,
  COUNTRY_GET_LIST_SELECT_SUCCESS,
  COUNTRY_GET_LIST_SELECT_ERROR,

  CITY_TOGGLE_MODAL,
  CITY_GET_LIST,
  CITY_GET_LIST_SUCCESS,
  CITY_GET_LIST_ERROR,
  CITY_GET_LIST_SELECT,
  CITY_GET_LIST_SELECT_SUCCESS,
  CITY_GET_LIST_SELECT_ERROR,
  
  DISTRICT_GET_LIST,
  DISTRICT_GET_LIST_SUCCESS,
  DISTRICT_GET_LIST_ERROR,
  DISTRICT_TOGGLE_MODAL,
  DISTRICT_GET_LIST_SELECT,
  DISTRICT_GET_LIST_SELECT_SUCCESS,
  DISTRICT_GET_LIST_SELECT_ERROR,

  WARD_GET_LIST,
  WARD_GET_LIST_SUCCESS,
  WARD_GET_LIST_ERROR,
  WARD_GET_LIST_SELECT,
  WARD_GET_LIST_SELECT_SUCCESS,
  WARD_GET_LIST_SELECT_ERROR
  
} from '../../../constants/actionTypes';


export const getAddressList = (params, history) => ({
  type: ADDRESS_GET_LIST,
  payload: { params, history }
});

export const getAddressListSuccess = (items) => ({
  type: ADDRESS_GET_LIST_SUCCESS,
  payload: items
});

export const getAddressListError = (error) => ({
  type: ADDRESS_GET_LIST_ERROR,
  payload: error
});

//Country

export const toggleCountryModal = (country = null) => ({
  type: COUNTRY_TOGGLE_MODAL,
  payload: country
});

export const getCountryList = (params, history) => ({
  type: COUNTRY_GET_LIST,
  payload: { params, history }
});

export const getCountryListSuccess = (items) => ({
  type: COUNTRY_GET_LIST_SUCCESS,
  payload: items
});

export const getCountryListError = (error) => ({
  type: COUNTRY_GET_LIST_ERROR,
  payload: error
});

export const addCountryItem = (item, history) => ({
  type: COUNTRY_ADD_ITEM,
  payload: { item, history }
});

export const addCountryItemSuccess = () => ({
  type: COUNTRY_ADD_ITEM_SUCCESS,
});

export const addCountryItemError = (error) => ({
  type: COUNTRY_ADD_ITEM_ERROR,
  payload: error
});

export const updateCountryItem = (item, history) => ({
  type: COUNTRY_UPDATE_ITEM,
  payload: { item, history }
});

export const updateCountryItemSuccess = () => ({
  type: COUNTRY_UPDATE_ITEM_SUCCESS,
});

export const updateCountryItemError = (error) => ({
  type: COUNTRY_UPDATE_ITEM_ERROR,
  payload: error
});

//City
export const toggleCityModal = (city = null) => ({
  type: CITY_TOGGLE_MODAL,
  payload: city
});

export const getCityList = (params, history) => ({
  type: CITY_GET_LIST,
  payload: { params, history }
});

export const getCityListSuccess = (items) => ({
  type: CITY_GET_LIST_SUCCESS,
  payload: items
});

export const getCityListError = (error) => ({
  type: CITY_GET_LIST_ERROR,
  payload: error
});

export const getCityListSelect = (params, history) => ({
  type: CITY_GET_LIST_SELECT,
  payload: { params, history }
});

export const getCityListSelectSuccess = (items) => ({
  type: CITY_GET_LIST_SELECT_SUCCESS,
  payload: items
});

export const getCityListSelectError = (error) => ({
  type: CITY_GET_LIST_SELECT_ERROR,
  payload: error
});

//District
export const toggleDistrictModal = (status = null) => ({
  type: DISTRICT_TOGGLE_MODAL,
  payload: status
})

export const getDistrictList = (params, history) => ({
  type: DISTRICT_GET_LIST,
  payload: { params, history }
});

export const getDistrictListSuccess = (items) => ({
  type: DISTRICT_GET_LIST_SUCCESS,
  payload: items
});

export const getDistrictListError = (error) => ({
  type: DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const getDistrictListSelect = (params, history) => ({
  type: DISTRICT_GET_LIST_SELECT,
  payload: { params, history }
});

export const getDistrictListSelectSuccess = (items) => ({
  type: DISTRICT_GET_LIST_SELECT_SUCCESS,
  payload: items
});

export const getDistrictListSelectError = (error) => ({
  type: DISTRICT_GET_LIST_SELECT_ERROR,
  payload: error
});



//Ward
export const getWardList = (params, history) => ({
  type: WARD_GET_LIST,
  payload: { params, history }
});

export const getWardListSuccess = (items) => ({
  type: WARD_GET_LIST_SUCCESS,
  payload: items
});

export const getWardListError = (error) => ({
  type: WARD_GET_LIST_ERROR,
  payload: error
});

export const getWardListSelect = (params, history) => ({
  type: WARD_GET_LIST_SELECT,
  payload: { params, history }
});

export const getWardListSelectSuccess = (items) => ({
  type: WARD_GET_LIST_SELECT_SUCCESS,
  payload: items
});

export const getWardListSelectError = (error) => ({
  type: WARD_GET_LIST_SELECT_ERROR,
  payload: error
});

export const getCountryListSelect = (params, history) => ({
  type: COUNTRY_GET_LIST_SELECT,
  payload: { params, history }
});

export const getCountryListSelectSuccess = (items) => ({
  type: COUNTRY_GET_LIST_SELECT_SUCCESS,
  payload: items
});

export const getCountryListSelectError = (error) => ({
  type: COUNTRY_GET_LIST_SELECT_ERROR,
  payload: error
});