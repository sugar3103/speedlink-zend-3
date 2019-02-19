import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  VERITY_AUTH,
  VERITY_AUTH_SUCCESS,
} from '../../constants/actionTypes';

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: { user }
});
export const loginUserSuccess = (token) => ({
  type: LOGIN_USER_SUCCESS,
  payload: token
});

export const loginUserError = (error) => ({
  type: LOGIN_USER_ERROR,
  payload: error
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const getVerifyAuth = () => ({
  type: VERITY_AUTH  
})

export const getVerifyAuthSuccess = (user) => ({
  type: VERITY_AUTH_SUCCESS,
  payload: user
})