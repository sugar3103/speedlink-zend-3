
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../util/history';
import {
  LOGIN_USER,
  LOGOUT_USER,
  VERITY_AUTH
} from '../../constants/actionTypes';

import { authHeader } from '../../util/auth-header';

import { apiUrl, EC_SUCCESS,EC_FAILURE_AUTHENCATION } from '../../constants/defaultValues';

import { loginUserSuccess, loginUserError, getVerifyAuthSuccess } from './actions';

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
      localStorage.setItem('authUser', JSON.stringify(data.token));
      yield put(loginUserSuccess(data.token));
      yield call(history.push, '/app/dashboards');

    } else {
      const error = data.message;
      yield put(loginUserError(error))
      createNotification({ type: 'warning', message: error.toString() })
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


//get Verify 
function getVerify() {
  return axios.request({
    method: 'post',
    headers: authHeader(),
    url: `${apiUrl}user`
  });
}

const verifyAsync = async () => {
  return await getVerify()
    .then(res => res.data)
    .catch(error => error);
}

function* verify() {
  try {
    const response = yield call(verifyAsync);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getVerifyAuthSuccess(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login');
        break;
      default:
        break;
    }
  } catch (error) {
    createNotification({ type: 'warning', message: error.toString() })
  }
}

export function* watchVerify() {
  yield takeEvery(VERITY_AUTH, verify);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchVerify)
  ]);
}