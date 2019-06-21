import {
  PRI_INT_APPROVED_BY_ERROR,

  PRI_INT_APPROVED_BY_GET_LIST,
  PRI_INT_APPROVED_BY_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const approvedByInternationalError = (error) => ({
  type: PRI_INT_APPROVED_BY_ERROR,
  payload: error
});

export const getApprovedByInternationalList = (params) => ({
  type: PRI_INT_APPROVED_BY_GET_LIST,
  payload: { params }
});

export const getApprovedByInternationalListSuccess = (items) => ({
  type: PRI_INT_APPROVED_BY_GET_LIST_SUCCESS,
  payload: { items }
});