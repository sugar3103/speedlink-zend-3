import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_DOM_AREA_GET_LIST,
  PRI_DOM_AREA_GET_LIST_CITY,
  PRI_DOM_AREA_ADD_ITEM,
  PRI_DOM_AREA_UPDATE_ITEM,
  PRI_DOM_AREA_DELETE_ITEM
} from "../../../constants/actionTypes";

import {
  areaDomesticError,
  getAreaDomesticListSuccess,
  getCityAreaDomesticListSuccess,
  addAreaDomesticItemSuccess,
  updateAreaDomesticItemSuccess,
  deleteAreaDomesticItemSuccess,
  getAreaDomesticList,
  toggleAreaDomesticModal
} from "./actions";

//validate
function validateAreaDomestic(errors) {
  if (errors.name && errors.name.domesticAreaExists) {
    return stopSubmit('area_domestic_action_form', {
      name: 'pri_dom.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.domesticAreaExists) {
    return stopSubmit('area_domestic_action_form', {
      name_en: 'pri_dom.validate-nameEn-exists'
    });
  }
}

/* GET LIST AREA DOMESTIC */

function getListAreaDomesticApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/area`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getAreaDomesticListRequest = async (params) => {
  return await getListAreaDomesticApi(params).then(res => res.data).catch(err => err)
};

function* getAreaDomesticListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getAreaDomesticListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getAreaDomesticListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(areaDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(areaDomesticError(error));
  }
}

/* GET CITY AREA DOMESTIC */
function getListCityAreaDomesticApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/area_city/city`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCityAreaDomesticListRequest = async (params) => {
  return await getListCityAreaDomesticApi(params).then(res => res.data).catch(err => err)
};

function* getCityAreaDomesticListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCityAreaDomesticListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCityAreaDomesticListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(areaDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(areaDomesticError(error));
  }
}

/* ADD AREA DOMESTIC */

function addAreaDomesticApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/area/add`,
    headers: authHeader(),
    data: item
  });
}

const addAreaDomesticItemRequest = async item => {
  return await addAreaDomesticApi(item).then(res => res.data).catch(err => err)
};

function* addAreaDomesticItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('area_domestic_action_form'));
  try {
    const response = yield call(addAreaDomesticItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addAreaDomesticItemSuccess());
        yield put(getAreaDomesticList());
        yield put(toggleAreaDomesticModal());
        createNotification({ type: 'success', message: 'pri_dom.add-success' });
        break;

      case EC_FAILURE:
        yield put(areaDomesticError(response.data));
        yield put(validateAreaDomestic(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(areaDomesticError(error));
  }
}

/* UPDATE AREA DOMESTIC */

function updateAreaDomesticApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/area/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateAreaDomesticItemRequest = async item => {
  return await updateAreaDomesticApi(item).then(res => res.data).catch(err => err)
};

function* updateAreaDomesticItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('area_domestic_action_form'));
  try {
    const response = yield call(updateAreaDomesticItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateAreaDomesticItemSuccess());
        yield put(getAreaDomesticList());
        yield put(toggleAreaDomesticModal());
        createNotification({ type: 'success', message: 'pri_dom.update-success' });
        break;

      case EC_FAILURE:
        yield put(areaDomesticError(response.data));
        yield put(validateAreaDomestic(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(areaDomesticError(error));
  }
}

/* DELETE AREA DOMESTIC */

function deleteAreaDomesticApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/area/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteAreaDomesticItemRequest = async ids => {
  return await deleteAreaDomesticApi(ids).then(res => res.data).catch(err => err)
};

function* deleteAreaDomesticItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteAreaDomesticItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteAreaDomesticItemSuccess());
        yield put(getAreaDomesticList());
        createNotification({ type: 'success', message: 'pri_dom.delete-success'});
        break;

      case EC_FAILURE:
        yield put(areaDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(areaDomesticError(error));
  }
}

export function* watchAreaDomesticGetList() {
  yield takeEvery(PRI_DOM_AREA_GET_LIST, getAreaDomesticListItems);
}

export function* watchAreaDomesticGetListCity() {
  yield takeEvery(PRI_DOM_AREA_GET_LIST_CITY, getCityAreaDomesticListItems);
}

export function* watchAreaDomesticAddItem() {
  yield takeEvery(PRI_DOM_AREA_ADD_ITEM, addAreaDomesticItem);
}

export function* watchAreaDomesticUpdateItem() {
  yield takeEvery(PRI_DOM_AREA_UPDATE_ITEM, updateAreaDomesticItem);
}

export function* watchAreaDomestiDeleteItem() {
  yield takeEvery(PRI_DOM_AREA_DELETE_ITEM, deleteAreaDomesticItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchAreaDomesticGetList),
    fork(watchAreaDomesticGetListCity),
    fork(watchAreaDomesticAddItem),
    fork(watchAreaDomesticUpdateItem),
    fork(watchAreaDomestiDeleteItem),
  ]);
}
