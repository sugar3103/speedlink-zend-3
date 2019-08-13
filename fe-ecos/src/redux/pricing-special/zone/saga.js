import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_SPECIAL_ZONE_GET_LIST,
  PRI_SPECIAL_ZONE_ADD_ITEM,
  PRI_SPECIAL_ZONE_UPDATE_ITEM,
  PRI_SPECIAL_ZONE_DELETE_ITEM
} from "../../../constants/actionTypes";

import {
  zoneSpecialError,
  getZoneSpecialListSuccess,
  addZoneSpecialItemSuccess,
  updateZoneSpecialItemSuccess,
  deleteZoneSpecialItemSuccess,
  getZoneSpecialList,
  toggleZoneSpecialModal
} from "./actions";

//validate
function validateZoneSpecial(errors) {
  if (errors.name && errors.name.specialZoneExists) {
    return stopSubmit('zone_special_action_form', {
      name: 'pri_special.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.specialZoneExists) {
    return stopSubmit('zone_special_action_form', {
      name_en: 'pri_special.validate-nameEn-exists'
    });
  }
}

/* GET LIST ZONE SPECIAL */

function getListZoneSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/zone`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getZoneSpecialListRequest = async (params) => {
  return await getListZoneSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getZoneSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getZoneSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getZoneSpecialListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(zoneSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneSpecialError(error));
  }
}

/* ADD ZONE SPECIAL */

function addZoneSpecialApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/zone/add`,
    headers: authHeader(),
    data: item
  });
}

const addZoneSpecialItemRequest = async item => {
  return await addZoneSpecialApi(item).then(res => res.data).catch(err => err)
};

function* addZoneSpecialItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('zone_special_action_form'));
  try {
    const response = yield call(addZoneSpecialItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addZoneSpecialItemSuccess());
        yield put(getZoneSpecialList());
        yield put(toggleZoneSpecialModal());
        createNotification({ type: 'success', message: 'pri_special.add-success' });
        break;

      case EC_FAILURE:
        yield put(zoneSpecialError(response.data));
        yield put(validateZoneSpecial(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneSpecialError(error));
  }
}

/* UPDATE ZONE SPECIAL */

function updateZoneSpecialApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/zone/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateZoneSpecialItemRequest = async item => {
  return await updateZoneSpecialApi(item).then(res => res.data).catch(err => err)
};

function* updateZoneSpecialItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('zone_special_action_form'));
  try {
    const response = yield call(updateZoneSpecialItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateZoneSpecialItemSuccess());
        yield put(getZoneSpecialList());
        yield put(toggleZoneSpecialModal());
        createNotification({ type: 'success', message: 'pri_special.update-success' });
        break;

      case EC_FAILURE:
        yield put(zoneSpecialError(response.data));
        yield put(validateZoneSpecial(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneSpecialError(error));
  }
}

/* DELETE ZONE SPECIAL */

function deleteZoneSpecialApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/zone/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteZoneSpecialItemRequest = async ids => {
  return await deleteZoneSpecialApi(ids).then(res => res.data).catch(err => err)
};

function* deleteZoneSpecialItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteZoneSpecialItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteZoneSpecialItemSuccess());
        yield put(getZoneSpecialList());
        createNotification({ type: 'success', message: 'pri_special.delete-success'});
        break;

      case EC_FAILURE:
        yield put(zoneSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneSpecialError(error));
  }
}

export function* watchZoneSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_ZONE_GET_LIST, getZoneSpecialListItems);
}

export function* watchZoneSpecialAddItem() {
  yield takeEvery(PRI_SPECIAL_ZONE_ADD_ITEM, addZoneSpecialItem);
}

export function* watchZoneSpecialUpdateItem() {
  yield takeEvery(PRI_SPECIAL_ZONE_UPDATE_ITEM, updateZoneSpecialItem);
}

export function* watchZoneDomestiDeleteItem() {
  yield takeEvery(PRI_SPECIAL_ZONE_DELETE_ITEM, deleteZoneSpecialItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchZoneSpecialGetList),
    fork(watchZoneSpecialAddItem),
    fork(watchZoneSpecialUpdateItem),
    fork(watchZoneDomestiDeleteItem),
  ]);
}