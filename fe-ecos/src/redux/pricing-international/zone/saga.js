import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_INT_ZONE_GET_LIST,
  PRI_INT_ZONE_ADD_ITEM,
  PRI_INT_ZONE_REQUEST_UPDATE_ITEM,
  PRI_INT_ZONE_UPDATE_ITEM,
  PRI_INT_ZONE_DELETE_ITEM
} from "../../../constants/actionTypes";

import {
  zoneInternationalError,
  getZoneInternationalListSuccess,
  addZoneInternationalItemSuccess,
  requestUpdateZoneInternationalItemSuccess,
  updateZoneInternationalItemSuccess,
  deleteZoneInternationalItemSuccess,
  getZoneInternationalList,
} from "./actions";

//validate
function validateZoneInternational(errors) {
  if (errors.name && errors.name.internationalZoneExists) {
    return stopSubmit('zone_international_action_form', {
      name: 'pri_int.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.internationalZoneExists) {
    return stopSubmit('zone_international_action_form', {
      name_en: 'pri_int.validate-nameEn-exists'
    });
  }
}

/* GET LIST ZONE INTERNATIONAL */

function getListZoneInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zone-code`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getZoneInternationalListRequest = async (params) => {
  return await getListZoneInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getZoneInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getZoneInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getZoneInternationalListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(zoneInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneInternationalError(error));
  }
}

/* ADD ZONE INTERNATIONAL */

function addZoneInternationalApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zone-code/add`,
    headers: authHeader(),
    data: item
  });
}

const addZoneInternationalItemRequest = async item => {
  return await addZoneInternationalApi(item).then(res => res.data).catch(err => err)
};

function* addZoneInternationalItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('zone_international_action_form'));
  try {
    const response = yield call(addZoneInternationalItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addZoneInternationalItemSuccess());
        yield call(history.push, '/pricing-international/zone');
        createNotification({ type: 'success', message: 'pri_int.add-success' });
        break;

      case EC_FAILURE:
        yield put(zoneInternationalError(response.data));
        createNotification({ type: 'error', message: 'pri_int.zone-exists' });
        yield put(validateZoneInternational(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneInternationalError(error));
  }
}

/* REQUEST ZONE UPDATE ITEM */

const getZoneInternationalUpdateRequest = async (params) => {
  return await getListZoneInternationalApi(params).then(res => res.data).catch(err => err)
};

function* requestZoneInternationalUpdateItems({ payload }) {
  const { param } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getZoneInternationalUpdateRequest, param);
    switch (response.error_code) {
      
      case EC_SUCCESS:
        yield put(requestUpdateZoneInternationalItemSuccess(response.data[0]));
        break;

      case EC_FAILURE:
        yield put(zoneInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneInternationalError(error));
  }
}

/* UPDATE ZONE INTERNATIONAL */

function updateZoneInternationalApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zone-code/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateZoneInternationalItemRequest = async item => {
  return await updateZoneInternationalApi(item).then(res => res.data).catch(err => err)
};

function* updateZoneInternationalItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('zone_international_action_form'));
  try {
    const response = yield call(updateZoneInternationalItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateZoneInternationalItemSuccess());
        yield call(history.push, '/pricing-international/zone');
        createNotification({ type: 'success', message: 'pri_int.update-success' });
        break;

      case EC_FAILURE:
        yield put(zoneInternationalError(response.data));
        createNotification({ type: 'error', message: 'pri_int.zone-exists' });
        yield put(validateZoneInternational(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneInternationalError(error));
  }
}

/* DELETE ZONE INTERNATIONAL */

function deleteZoneInternationalApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zone-code/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteZoneInternationalItemRequest = async ids => {
  return await deleteZoneInternationalApi(ids).then(res => res.data).catch(err => err)
};

function* deleteZoneInternationalItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteZoneInternationalItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteZoneInternationalItemSuccess());
        yield put(getZoneInternationalList());
        createNotification({ type: 'success', message: 'pri_int.delete-success'});
        break;

      case EC_FAILURE:
        yield put(zoneInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneInternationalError(error));
  }
}

export function* watchZoneInternationalGetList() {
  yield takeEvery(PRI_INT_ZONE_GET_LIST, getZoneInternationalListItems);
}

export function* watchZoneInternationalAddItem() {
  yield takeEvery(PRI_INT_ZONE_ADD_ITEM, addZoneInternationalItem);
}

export function* watchRequestZoneInternationalUpdateItem() {
  yield takeEvery(PRI_INT_ZONE_REQUEST_UPDATE_ITEM, requestZoneInternationalUpdateItems);
}

export function* watchZoneInternationalUpdateItem() {
  yield takeEvery(PRI_INT_ZONE_UPDATE_ITEM, updateZoneInternationalItem);
}

export function* watchZoneInternationalDeleteItem() {
  yield takeEvery(PRI_INT_ZONE_DELETE_ITEM, deleteZoneInternationalItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchZoneInternationalGetList),
    fork(watchZoneInternationalAddItem),
    fork(watchRequestZoneInternationalUpdateItem),
    fork(watchZoneInternationalUpdateItem),
    fork(watchZoneInternationalDeleteItem),
  ]);
}
