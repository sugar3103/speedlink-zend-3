import {
 
  CITY_GET_LIST,
  CITY_GET_LIST_SUCCESS,
  CITY_GET_LIST_ERROR
} from '../../../../constants/actionTypes';


export const getCityList = (params, messages) => ({
  type: CITY_GET_LIST,
  payload: { params, messages }
});

export const getCityListSuccess = (items, total) => ({
  type: CITY_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getCityListError = (error) => ({
  type: CITY_GET_LIST_ERROR,
  payload: error
});
