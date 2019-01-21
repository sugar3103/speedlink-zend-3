import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER
} from '../../constants/actionTypes';

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: { user }
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});