import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  VERITY_AUTH,
  VERITY_AUTH_SUCCESS
} from '../../constants/actionTypes';

const INIT_STATE = {
  loading: false,
  token: '',
  user: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:    
      return { ...state, loading: false, token: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null };
    case VERITY_AUTH:
      return {...state}
    case VERITY_AUTH_SUCCESS:
      return {...state, user: action.payload }
    default: return { ...state };
  }
}
