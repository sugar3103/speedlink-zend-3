import {
  ADDRESS_GET_LIST,
  ADDRESS_GET_LIST_SUCCESS,
  ADDRESS_GET_LIST_ERROR,

  COUNTRY_GET_LIST,
  COUNTRY_GET_LIST_SUCCESS,
  COUNTRY_GET_LIST_ERROR,

  CITY_GET_LIST,
  CITY_GET_LIST_SUCCESS,
  CITY_GET_LIST_ERROR,
  
  DISTRICT_GET_LIST,
  DISTRICT_GET_LIST_SUCCESS,
  DISTRICT_GET_LIST_ERROR,
  DISTRICT_TOGGLE_MODAL,

  WARD_GET_LIST,
  WARD_GET_LIST_SUCCESS,
  WARD_GET_LIST_ERROR,
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

//City
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