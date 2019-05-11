import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  USER_GET_LIST,
  USER_UPDATE_ITEM,  
  USER_UPLOAD_AVATAR
} from "../../../../constants/actionTypes";

import {
  getUserListSuccess,
  getUserListError,
  updateUserItemSuccess,
  updateUserItemError,
  getUserList,
  toggleUserModal,
} from "./actions";

import { getVerifyAuth } from '../../../actions';

import createNotification from '../../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate

function validateUser(errors) {
  if (errors.username && errors.username.userExists) {
    return stopSubmit('user_action_form', {
      name: 'user.validate-username-exists'
    });
  }
}

//list user

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}users`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getUserListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getUserListItems({ payload }) {
  const { pathname } = history.location;
  try {
    const response = yield call(getUserListRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getUserListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getUserListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getUserListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(USER_GET_LIST, getUserListItems);
}


//update user

function updateUserApi(item) {
  
  return axios.request({
    method: 'post',
    url: `${apiUrl}user/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateUserItemRequest = async item => {
  return await updateUserApi(item).then(res => res.data).catch(err => err)
};

function* updateUserItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('user_action_form'));
  try {
    const response = yield call(updateUserItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateUserItemSuccess());
        yield put(getUserList());
        yield put(getVerifyAuth());
        yield put(toggleUserModal());
        createNotification({ type: 'success', message: 'user.update-success' });
        break;

      case EC_FAILURE:
        yield put(updateUserItemError(response.data));
        yield put(validateUser(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(updateUserItemError(error));
  }
}

export function* wathcUpdateItem() {
  yield takeEvery(USER_UPDATE_ITEM, updateUserItem);
}

//Upload

//update user

function updateUserAvatarApi(item) {
  console.log(item);
  
  return axios.request({
    method: 'post',
    url: `${apiUrl}user/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateUserAvatarItemRequest = async item => {
  return await updateUserAvatarApi(item).then(res => res.data).catch(err => err)
};

function* updateUserAvatarItem({ payload }) {
  const { item } = payload;  
  const { pathname } = history.location;
  try {
    const response = yield call(updateUserAvatarItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateUserItemSuccess());
        yield put(getVerifyAuth());
        createNotification({ type: 'success', message: 'user.update-success'});
        break;

      case EC_FAILURE:
        yield put(updateUserItemError(response.data));
        yield put(validateUser(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(updateUserItemError(error));
  }
}

export function* wathcUpdateAvatarItem() {
  yield takeEvery(USER_UPLOAD_AVATAR, updateUserAvatarItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList),fork(wathcUpdateItem),fork(wathcUpdateAvatarItem)]);
}
