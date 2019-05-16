import {
  PRI_DOM_SERVICE_ERROR,

  PRI_DOM_SERVICE_GET_LIST,
  PRI_DOM_SERVICE_GET_LIST_SUCCESS,

} from '../../../constants/actionTypes';

export const serviceDomesticError = (error) => ({
  type: PRI_DOM_SERVICE_ERROR,
  payload: error
});

export const getServiceDomesticList = (params) => ({
  type: PRI_DOM_SERVICE_GET_LIST,
  payload: { params }
});

export const getServiceDomesticListSuccess = (items) => ({
  type: PRI_DOM_SERVICE_GET_LIST_SUCCESS,
  payload: { items }
});