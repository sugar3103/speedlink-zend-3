import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  DISTRICT_GET_LIST,
  DISTRICT_ADD_ITEM,
  DISTRICT_UPDATE_ITEM,
  DISTRICT_DELETE_ITEM 
} from "../../../../constants/actionTypes";

import {
  toggleDistrictModal,
  getDistrictListSuccess,
  getDistrictListError,
  addDistrictItemSuccess,
  addDistrictItemError,
  updateDistrictItemSuccess,
  updateDistrictItemError,
  deleteDistrictItemSuccess,
  deleteDistrictItemError,
  getDistrictList,
} from "./actions";

import createNotification from '../../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate 
function validateDistrict(errors) {
  if (errors.name && errors.name.districtExists) {
    return stopSubmit('district_action_form', {
      name: 'district.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.districtExists) {
    return stopSubmit('district_action_form', {
      name_en: 'district.validate-nameEn-exists'
    });
  }
}

//list district

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/district`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDistrictListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getDistrictListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDistrictListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDistrictListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getDistrictListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getDistrictListError(error));
  }
}

//add district

function addDistrictApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/district/add`,
    headers: authHeader(),
    data: item
  });
}

const addDistrictItemRequest = async item => {
  return await addDistrictApi(item).then(res => res.data).catch(err => err)
};

function* addDistrictItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('district_action_form'));
  try {
    const response = yield call(addDistrictItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addDistrictItemSuccess());
        yield put(getDistrictList());
        yield put(toggleDistrictModal());
        createNotification({ type: 'success', message: 'district.add-success' });
        break;

      case EC_FAILURE:
        yield put(addDistrictItemError(response.message));
        yield put(validateDistrict(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(addDistrictItemError(error));
  }
}

//update district

function updateDistrictApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/district/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateDistrictItemRequest = async item => {
  return await updateDistrictApi(item).then(res => res.data).catch(err => err)
};

function* updateDistrictItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('district_action_form'));
  try {
    const response = yield call(updateDistrictItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateDistrictItemSuccess());
        yield put(getDistrictList());
        yield put(toggleDistrictModal());
        createNotification({ type: 'success', message: 'district.update-success' });
        break;

      case EC_FAILURE:
        yield put(updateDistrictItemError(response.message));
        yield put(validateDistrict(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(updateDistrictItemError(error));
  }
}

//delete district

function deleteDistrictApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/district/delete`,
    headers: authHeader(),
    data: {  ids: id }
  });
}

const deleteDistrictItemRequest = async id => {
  return await deleteDistrictApi(id).then(res => res.data).catch(err => err)
};

function* deleteDistrictItem({ payload }) {
  const { id } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteDistrictItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteDistrictItemSuccess());
        yield put(getDistrictList());
        createNotification({ type: 'success',  message: 'district.delete-success' });
        break;

      case EC_FAILURE:
        yield put(deleteDistrictItemError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(deleteDistrictItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(DISTRICT_GET_LIST, getDistrictListItems);
}

export function* wathcAddItem() {
  yield takeEvery(DISTRICT_ADD_ITEM, addDistrictItem);
}

export function* wathcUpdateItem() {
  yield takeEvery(DISTRICT_UPDATE_ITEM, updateDistrictItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(DISTRICT_DELETE_ITEM, deleteDistrictItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcUpdateItem), fork(wathcDeleteItem)]);
}
