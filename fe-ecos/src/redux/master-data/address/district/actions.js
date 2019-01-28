import {
 
  DISTRICT_GET_LIST,
  DISTRICT_GET_LIST_SUCCESS,
  DISTRICT_GET_LIST_ERROR
} from '../../../../constants/actionTypes';


export const getDistrictList = (params, messages) => ({
  type: DISTRICT_GET_LIST,
  payload: { params, messages }
});

export const getDistrictListSuccess = (items, total) => ({
  type: DISTRICT_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getDistrictListError = (error) => ({
  type: DISTRICT_GET_LIST_ERROR,
  payload: error
});
