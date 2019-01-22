
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOGIN_USER,
  LOGOUT_USER
} from '../../constants/actionTypes';

import { apiUrl, EC_SUCCESS } from '../../constants/defaultValues';

import {
  loginUserSuccess
} from './actions';

import { alertError } from '../alert/actions';

function loginApi(user) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/auth/login`,
    data: user
  });
}

const loginAsync = async (user) => {
  return await loginApi(user)
    .then(res => res.data)
    .catch(error => error);
}

function* login({ payload }) {
  const { user, history } = payload;
  try {
    const data = yield call(loginAsync, user);
    if (data.error_code === EC_SUCCESS) {
      const user = {
        user: data.user,
        token: data.token
      };
      localStorage.setItem('user', JSON.stringify(user));
      yield put(loginUserSuccess(user));
      history.push('/');
    } else {
      const error = data.message;
      yield put(alertError(error.toString()));
    }
  } catch (error) {
    console.log('login error : ', error)
  }
}

const logoutAsync = async (history) => {
  history.push('/')
}

function* logout({ payload }) {
  const { history } = payload
  try {
    yield call(logoutAsync, history);
    localStorage.removeItem('user');
  } catch (error) {
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
  ]);
}