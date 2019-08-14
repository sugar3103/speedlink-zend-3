import {
  PRI_SPECIAL_APPROVED_BY_ERROR,

  PRI_SPECIAL_APPROVED_BY_GET_LIST,
  PRI_SPECIAL_APPROVED_BY_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const approvedBySpecialError = (error) => ({
  type: PRI_SPECIAL_APPROVED_BY_ERROR,
  payload: error
});

export const getApprovedBySpecialList = (params) => ({
  type: PRI_SPECIAL_APPROVED_BY_GET_LIST,
  payload: { params }
});

export const getApprovedBySpecialListSuccess = (items) => ({
  type: PRI_SPECIAL_APPROVED_BY_GET_LIST_SUCCESS,
  payload: { items }
});