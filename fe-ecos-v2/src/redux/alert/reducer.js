import {
  ALERT_SUCCESS,
  ALERT_ERROR,
  ALERT_DANGER,
  ALERT_CLEAR,
} from '../../constants/actionTypes';

const INIT_STATE = {
  type: null,
  message: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return { type: 'success', message: action.payload };
    case ALERT_DANGER:
      return { type: 'warning', message: action.payload };
    case ALERT_ERROR:
      return { type: 'error', message: action.payload };
    case ALERT_CLEAR:
      return {};
    default: return state;
  }
}