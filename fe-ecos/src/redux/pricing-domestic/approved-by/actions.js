import {
  PRI_DOM_APPROVED_BY_ERROR,

  PRI_DOM_APPROVED_BY_GET_LIST,
  PRI_DOM_APPROVED_BY_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const approvedByDomesticError = (error) => ({
  type: PRI_DOM_APPROVED_BY_ERROR,
  payload: error
});

export const getApprovedByDomesticList = (params) => ({
  type: PRI_DOM_APPROVED_BY_GET_LIST,
  payload: { params }
});

export const getApprovedByDomesticListSuccess = (items) => ({
  type: PRI_DOM_APPROVED_BY_GET_LIST_SUCCESS,
  payload: { items }
});