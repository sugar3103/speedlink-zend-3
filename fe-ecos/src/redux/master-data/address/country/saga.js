import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  COUNTRY_GET_LIST,
  COUNTRY_ADD_ITEM,
  COUNTRY_UPDATE_ITEM,
  COUNTRY_DELETE_ITEM 
} from "../../../../constants/actionTypes";

import {
  toggleCountryModal,
  getCountryListSuccess,
  getCountryListError,
  addCountryItemSuccess,
  addCountryItemError,
  updateCountryItemSuccess,
  updateCountryItemError,
  deleteCountryItemSuccess,
  deleteCountryItemError,
  getCountryList,
} from "./actions";

import createNotification from '../../../../util/notifications';

//list country

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/country`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCountryListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getCountryListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCountryListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCountryListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getCountryListError(response.message));
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
    yield put(getCountryListError(error));
  }
}

//add country

function addCountryApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/country/add`,
    headers: authHeader(),
    data: item
  });
}

const addCountryItemRequest = async item => {
  return await addCountryApi(item).then(res => res.data).catch(err => err)
};

function* addCountryItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(addCountryItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addCountryItemSuccess());
        yield put(getCountryList(null, messages));
        yield put(toggleCountryModal());
        createNotification({
          type: 'success', 
          message: messages['country.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addCountryItemError(response.message));
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
    yield put(addCountryItemError(error));
  }
}

//update country

function updateCountryApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/country/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateCountryItemRequest = async item => {
  return await updateCountryApi(item).then(res => res.data).catch(err => err)
};

function* updateCountryItem({ payload }) {
  const { item, messages } = payload;
  
  try {
    const response = yield call(updateCountryItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateCountryItemSuccess());
        yield put(getCountryList(null, messages));
        yield put(toggleCountryModal());
        createNotification({
          type: 'success', 
          message: messages['country.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateCountryItemError(response.message));
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
    yield put(updateCountryItemError(error));
  }
}

//delete country

function deleteCountryApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/country/delete`,
    headers: authHeader(),
    data: {  ids: id }
  });
}

const deleteCountryItemRequest = async id => {
  return await deleteCountryApi(id).then(res => res.data).catch(err => err)
};

function* deleteCountryItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteCountryItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteCountryItemSuccess());
        yield put(getCountryList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['country.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteCountryItemError(response.message));
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
    yield put(deleteCountryItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(COUNTRY_GET_LIST, getCountryListItems);
}

export function* wathcAddItem() {
  yield takeEvery(COUNTRY_ADD_ITEM, addCountryItem);
}

export function* wathcUpdateItem() {
  yield takeEvery(COUNTRY_UPDATE_ITEM, updateCountryItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(COUNTRY_DELETE_ITEM, deleteCountryItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcUpdateItem), fork(wathcDeleteItem)]);
}
