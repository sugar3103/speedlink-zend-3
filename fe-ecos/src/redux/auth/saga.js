
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../util/history';
import {
  LOGIN_USER,
  LOGOUT_USER
} from '../../constants/actionTypes';

import { apiUrl, EC_SUCCESS } from '../../constants/defaultValues';

import {
  loginUserSuccess
} from './actions';

import createNotification from '../../util/notifications';

function loginApi(user) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}auth/login`,
    data: user
  });
}

const loginAsync = async (user) => {
  return await loginApi(user)
    .then(res => res.data)
    .catch(error => error);
}

function* login({ payload }) {
  const { user } = payload;
  
  try {
    const data = yield call(loginAsync, user);
    if (data.error_code === EC_SUCCESS) {
      const authUser = {
        user: data.user,
        token: data.token
      };
      localStorage.setItem('authUser', JSON.stringify(authUser));
      yield put(loginUserSuccess(authUser));
      yield call(history.push, '/app/dashboards');
    } else {
      const error = data.message;
      createNotification({type: 'warning', message: error.toString()})
    }
  } catch (error) {
    console.log('login error : ', error)
  }
}

const logoutAsync = async () => {
  history.push('/login')
}

function* logout() {
  try {
    yield call(logoutAsync);
    localStorage.removeItem('authUser');
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