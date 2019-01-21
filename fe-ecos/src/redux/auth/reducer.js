import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER
} from '../../constants/actionTypes';

const INIT_STATE = {
  user: localStorage.getItem('authUser'),
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null };
    default: return { ...state };
  }
}
