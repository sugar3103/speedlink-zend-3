import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_DOM_ZONE_GET_LIST,
  PRI_DOM_ZONE_ADD_ITEM,
  PRI_DOM_ZONE_UPDATE_ITEM,
  PRI_DOM_ZONE_DELETE_ITEM
} from "../../../constants/actionTypes";

import {
  zoneDomesticError,
  getZoneDomesticListSuccess,
  addZoneDomesticItemSuccess,
  updateZoneDomesticItemSuccess,
  deleteZoneDomesticItemSuccess,
  getZoneDomesticList,
  toggleZoneDomesticModal
} from "./actions";

//validate
function validateZoneDomestic(errors) {
  if (errors.name && errors.name.domesticZoneExists) {
    return stopSubmit('zone_domestic_action_form', {
      name: 'pri_dom.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.domesticZoneExists) {
    return stopSubmit('zone_domestic_action_form', {
      name_en: 'pri_dom.validate-nameEn-exists'
    });
  }
}

/* GET LIST ZONE DOMESTIC */

function getListZoneDomesticApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/zone`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getZoneDomesticListRequest = async (params) => {
  return await getListZoneDomesticApi(params).then(res => res.data).catch(err => err)
};

function* getZoneDomesticListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getZoneDomesticListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getZoneDomesticListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(zoneDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneDomesticError(error));
  }
}

/* ADD ZONE DOMESTIC */

function addZoneDomesticApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/zone/add`,
    headers: authHeader(),
    data: item
  });
}

const addZoneDomesticItemRequest = async item => {
  return await addZoneDomesticApi(item).then(res => res.data).catch(err => err)
};

function* addZoneDomesticItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('zone_domestic_action_form'));
  try {
    const response = yield call(addZoneDomesticItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addZoneDomesticItemSuccess());
        yield put(getZoneDomesticList());
        yield put(toggleZoneDomesticModal());
        createNotification({ type: 'success', message: 'pri_dom.add-success' });
        break;

      case EC_FAILURE:
        yield put(zoneDomesticError(response.data));
        yield put(validateZoneDomestic(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneDomesticError(error));
  }
}

/* UPDATE ZONE DOMESTIC */

function updateZoneDomesticApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/zone/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateZoneDomesticItemRequest = async item => {
  return await updateZoneDomesticApi(item).then(res => res.data).catch(err => err)
};

function* updateZoneDomesticItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('zone_domestic_action_form'));
  try {
    const response = yield call(updateZoneDomesticItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateZoneDomesticItemSuccess());
        yield put(getZoneDomesticList());
        yield put(toggleZoneDomesticModal());
        createNotification({ type: 'success', message: 'pri_dom.update-success' });
        break;

      case EC_FAILURE:
        yield put(zoneDomesticError(response.data));
        yield put(validateZoneDomestic(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneDomesticError(error));
  }
}

/* DELETE ZONE DOMESTIC */

function deleteZoneDomesticApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/zone/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteZoneDomesticItemRequest = async ids => {
  return await deleteZoneDomesticApi(ids).then(res => res.data).catch(err => err)
};

function* deleteZoneDomesticItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteZoneDomesticItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteZoneDomesticItemSuccess());
        yield put(getZoneDomesticList());
        createNotification({ type: 'success', message: 'pri_dom.delete-success'});
        break;

      case EC_FAILURE:
        yield put(zoneDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(zoneDomesticError(error));
  }
}

export function* watchZoneDomesticGetList() {
  yield takeEvery(PRI_DOM_ZONE_GET_LIST, getZoneDomesticListItems);
}

export function* watchZoneDomesticAddItem() {
  yield takeEvery(PRI_DOM_ZONE_ADD_ITEM, addZoneDomesticItem);
}

export function* watchZoneDomesticUpdateItem() {
  yield takeEvery(PRI_DOM_ZONE_UPDATE_ITEM, updateZoneDomesticItem);
}

export function* watchZoneDomestiDeleteItem() {
  yield takeEvery(PRI_DOM_ZONE_DELETE_ITEM, deleteZoneDomesticItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchZoneDomesticGetList),
    fork(watchZoneDomesticAddItem),
    fork(watchZoneDomesticUpdateItem),
    fork(watchZoneDomestiDeleteItem),
  ]);
}
