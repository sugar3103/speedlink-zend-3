import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  CITY_GET_LIST,
  CITY_ADD_ITEM,
  CITY_UPDATE_ITEM,
  CITY_DELETE_ITEM 
} from "../../../../constants/actionTypes";

import {
  toggleCityModal,
  getCityListSuccess,
  getCityListError,
  addCityItemSuccess,
  addCityItemError,
  updateCityItemSuccess,
  updateCityItemError,
  deleteCityItemSuccess,
  deleteCityItemError,
  getCityList,
} from "./actions";

import createNotification from '../../../../util/notifications';

//list city

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCityListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getCityListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCityListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCityListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getCityListError(response.data));
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
    yield put(getCityListError(error));
  }
}

//add city

function addCityApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city/add`,
    headers: authHeader(),
    data: item
  });
}

const addCityItemRequest = async item => {
  return await addCityApi(item).then(res => res.data).catch(err => err)
};

function* addCityItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(addCityItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addCityItemSuccess());
        yield put(getCityList(null, messages));
        yield put(toggleCityModal());
        createNotification({
          type: 'success', 
          message: messages['city.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addCityItemError(response.data));
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
    yield put(addCityItemError(error));
  }
}

//update city

function updateCityApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateCityItemRequest = async item => {
  return await updateCityApi(item).then(res => res.data).catch(err => err)
};

function* updateCityItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(updateCityItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateCityItemSuccess());
        yield put(getCityList(null, messages));
        yield put(toggleCityModal());
        createNotification({
          type: 'success', 
          message: messages['city.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateCityItemError(response.data));
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
    yield put(updateCityItemError(error));
  }
}

//delete city

function deleteCityApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city/delete`,
    headers: authHeader(),
    data: {  id: id }
  });
}

const deleteCityItemRequest = async id => {
  return await deleteCityApi(id).then(res => res.data).catch(err => err)
};

function* deleteCityItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteCityItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteCityItemSuccess());
        yield put(getCityList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['city.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteCityItemError(response.data));
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
    yield put(deleteCityItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(CITY_GET_LIST, getCityListItems);
}

export function* wathcAddItem() {
  yield takeEvery(CITY_ADD_ITEM, addCityItem);
}

export function* wathcUpdateItem() {
  yield takeEvery(CITY_UPDATE_ITEM, updateCityItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(CITY_DELETE_ITEM, deleteCityItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcUpdateItem), fork(wathcDeleteItem)]);
}
