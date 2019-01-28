import {
  ALERT_SUCCESS,
  ALERT_ERROR,
  ALERT_CLEAR,
  ALERT_DANGER,
} from '../../constants/actionTypes';

export const alertSuccess = (message) => ({
  type: ALERT_SUCCESS,
  payload: message
});

export const alertDanger = (message) => ({
  type: ALERT_DANGER,
  payload: message
});

export const alertError = (message) => ({
  type: ALERT_ERROR,
  payload: message
});

export const alertClear = () => ({
  type: ALERT_CLEAR
});