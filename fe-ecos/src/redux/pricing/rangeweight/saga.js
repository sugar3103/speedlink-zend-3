import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  RANGEWEIGHT_GET_LIST,
  RANGEWEIGHT_ADD_ITEM,
  RANGEWEIGHT_UPDATE_ITEM,
  RANGEWEIGHT_DELETE_ITEM 
} from "../../../constants/actionTypes";

import {
  toggleRangeWeightModal,
  getRangeWeightListSuccess,
  getRangeWeightListError,
  addRangeWeightItemSuccess,
  addRangeWeightItemError,
  updateRangeWeightItemSuccess,
  updateRangeWeightItemError,
  deleteRangeWeightItemSuccess,
  deleteRangeWeightItemError,
  getRangeWeightList,
} from "./actions";

import createNotification from '../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate

function validateRangeWeight(errors) {
  if (errors.name && errors.name.rangeweightExists) {
    return stopSubmit('rangeweight_action_form', {
      name: 'rangeweight.validate-name-exists'
    });
  }
}

//list rangeweight

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}rangeweight`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getRangeWeightListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getRangeWeightListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getRangeWeightListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getRangeWeightListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getRangeWeightListError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getRangeWeightListError(error));
  }
}

//add rangeweight

function addRangeWeightApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}rangeweight/add`,
    headers: authHeader(),
    data: item
  });
}

const addRangeWeightItemRequest = async item => {
  return await addRangeWeightApi(item).then(res => res.data).catch(err => err)
};

function* addRangeWeightItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('rangeweight_action_form'));
  try {
    const response = yield call(addRangeWeightItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addRangeWeightItemSuccess());
        yield put(getRangeWeightList(null, messages));
        yield put(toggleRangeWeightModal());
        createNotification({
          type: 'success', 
          message: messages['rangeweight.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addRangeWeightItemError(response.data));
        yield put(validateRangeWeight(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(addRangeWeightItemError(error));
  }
}

//update rangeweight

function updateRangeWeightApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}rangeweight/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateRangeWeightItemRequest = async item => {
  return await updateRangeWeightApi(item).then(res => res.data).catch(err => err)
};

function* updateRangeWeightItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('rangeweight_action_form'));
  try {
    const response = yield call(updateRangeWeightItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateRangeWeightItemSuccess());
        yield put(getRangeWeightList(null, messages));
        yield put(toggleRangeWeightModal());
        createNotification({
          type: 'success', 
          message: messages['rangeweight.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateRangeWeightItemError(response.data));
        yield put(validateRangeWeight(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(updateRangeWeightItemError(error));
  }
}

//delete rangeweight

function deleteRangeWeightApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}rangeweight/delete`,
    headers: authHeader(),
    data: {  id: id }
  });
}

const deleteRangeWeightItemRequest = async id => {
  return await deleteRangeWeightApi(id).then(res => res.data).catch(err => err)
};

function* deleteRangeWeightItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteRangeWeightItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteRangeWeightItemSuccess());
        yield put(getRangeWeightList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['rangeweight.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteRangeWeightItemError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(deleteRangeWeightItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(RANGEWEIGHT_GET_LIST, getRangeWeightListItems);
}

export function* watchAddItem() {
  yield takeEvery(RANGEWEIGHT_ADD_ITEM, addRangeWeightItem);
}

export function* watchUpdateItem() {
  yield takeEvery(RANGEWEIGHT_UPDATE_ITEM, updateRangeWeightItem);
}

export function* watchDeleteItem() {
  yield takeEvery(RANGEWEIGHT_DELETE_ITEM, deleteRangeWeightItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem)]);
}
