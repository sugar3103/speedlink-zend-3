import {
  ADDRESS_GET_LIST,
  ADDRESS_GET_LIST_SUCCESS,
  ADDRESS_GET_LIST_ERROR,
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