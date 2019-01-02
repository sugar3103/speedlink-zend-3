import { userConstants, errorCodeConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';
import { alertActions } from './';

const login = (username, password, remember_me) => {

  const request = (user) => {
    return {
      type: userConstants.LOGIN_REQUEST,
      user
    }
  }

  const success = (user) => {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user
    }
  }

  const failure = (error) => {
    return {
      type: userConstants.LOGIN_FAILURE,
      error
    }
  }

  return dispatch => {
    dispatch(request({username}));

    userService.login(username, password, remember_me)
    .then(res => {
      switch (res.error_code) {
        case errorCodeConstants.SUCCESS:
          const user = {
            user: res.result.user,
            token: res.result.token
          };
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(success(user));
          history.push('/');
          break;
        case errorCodeConstants.FAILURE:
          dispatch(failure(res.message));
          break;
        case errorCodeConstants.FAILURE_IDENTITY_NOT_FOUND:
          const error = res.message;
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
          break;
        default:
          break;
      }
    });
  }
}

export const userActions = {
  login
};



