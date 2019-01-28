import {
 
  WARD_GET_LIST,
  WARD_GET_LIST_SUCCESS,
  WARD_GET_LIST_ERROR
} from '../../../../constants/actionTypes';


export const getWardList = (params, messages) => ({
  type: WARD_GET_LIST,
  payload: { params, messages }
});

export const getWardListSuccess = (items, total) => ({
  type: WARD_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getWardListError = (error) => ({
  type: WARD_GET_LIST_ERROR,
  payload: error
});
