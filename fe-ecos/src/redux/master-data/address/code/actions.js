import {
  CODE_GET_LIST,
  CODE_GET_LIST_SUCCESS,
  CODE_GET_LIST_ERROR,
} from '../../../../constants/actionTypes';

export const getCodeList = (params, messages) => ({
  type: CODE_GET_LIST,
  payload: { params, messages }
});

export const getCodeListSuccess = (items, total) => ({
  type: CODE_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getCodeListError = (error) => ({
  type: CODE_GET_LIST_ERROR,
  payload: error
});