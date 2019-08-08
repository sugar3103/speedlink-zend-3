import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_SPECIAL_AREA_GET_LIST,
  PRI_SPECIAL_AREA_ADD_ITEM,
  PRI_SPECIAL_AREA_UPDATE_ITEM,
  PRI_SPECIAL_AREA_DELETE_ITEM
} from "../../../constants/actionTypes";

import {
  areaSpecialError,
  getAreaSpecialListSuccess,
  addAreaSpecialItemSuccess,
  updateAreaSpecialItemSuccess,
  deleteAreaSpecialItemSuccess,
  getAreaSpecialList,
  toggleAreaSpecialModal
} from "./actions";

//validate
function validateAreaSpecial(errors) {
  if (errors.name && errors.name.specialAreaExists) {
    return stopSubmit('area_special_action_form', {
      name: 'pri_special.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.specialAreaExists) {
    return stopSubmit('area_special_action_form', {
      name_en: 'pri_special.validate-nameEn-exists'
    });
  }
}

/* GET LIST AREA SPECIAL */

function getListAreaSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/area`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getAreaSpecialListRequest = async (params) => {
  return await getListAreaSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getAreaSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getAreaSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getAreaSpecialListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(areaSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(areaSpecialError(error));
  }
}

/* ADD AREA SPECIAL */

function addAreaSpecialApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/area/add`,
    headers: authHeader(),
    data: item
  });
}

const addAreaSpecialItemRequest = async item => {
  return await addAreaSpecialApi(item).then(res => res.data).catch(err => err)
};

function* addAreaSpecialItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('area_special_action_form'));
  try {
    const response = yield call(addAreaSpecialItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addAreaSpecialItemSuccess());
        yield put(getAreaSpecialList());
        yield put(toggleAreaSpecialModal());
        createNotification({ type: 'success', message: 'pri_special.add-success' });
        break;

      case EC_FAILURE:
        yield put(areaSpecialError(response.data));
        yield put(validateAreaSpecial(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(areaSpecialError(error));
  }
}

/* UPDATE AREA SPECIAL */

function updateAreaSpecialApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/area/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateAreaSpecialItemRequest = async item => {
  return await updateAreaSpecialApi(item).then(res => res.data).catch(err => err)
};

function* updateAreaSpecialItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('area_special_action_form'));
  try {
    const response = yield call(updateAreaSpecialItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateAreaSpecialItemSuccess());
        yield put(getAreaSpecialList());
        yield put(toggleAreaSpecialModal());
        createNotification({ type: 'success', message: 'pri_special.update-success' });
        break;

      case EC_FAILURE:
        yield put(areaSpecialError(response.data));
        yield put(validateAreaSpecial(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(areaSpecialError(error));
  }
}

/* DELETE AREA SPECIAL */

function deleteAreaSpecialApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/area/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteAreaSpecialItemRequest = async ids => {
  return await deleteAreaSpecialApi(ids).then(res => res.data).catch(err => err)
};

function* deleteAreaSpecialItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteAreaSpecialItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteAreaSpecialItemSuccess());
        yield put(getAreaSpecialList());
        createNotification({ type: 'success', message: 'pri_special.delete-success'});
        break;

      case EC_FAILURE:
        yield put(areaSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(areaSpecialError(error));
  }
}

export function* watchAreaSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_AREA_GET_LIST, getAreaSpecialListItems);
}

export function* watchAreaSpecialAddItem() {
  yield takeEvery(PRI_SPECIAL_AREA_ADD_ITEM, addAreaSpecialItem);
}

export function* watchAreaSpecialUpdateItem() {
  yield takeEvery(PRI_SPECIAL_AREA_UPDATE_ITEM, updateAreaSpecialItem);
}

export function* watchAreaDomestiDeleteItem() {
  yield takeEvery(PRI_SPECIAL_AREA_DELETE_ITEM, deleteAreaSpecialItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchAreaSpecialGetList),
    fork(watchAreaSpecialAddItem),
    fork(watchAreaSpecialUpdateItem),
    fork(watchAreaDomestiDeleteItem),
  ]);
}
