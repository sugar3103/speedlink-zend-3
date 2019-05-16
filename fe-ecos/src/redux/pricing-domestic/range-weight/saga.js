import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_DOM_RANGE_WEIGHT_GET_LIST,
  PRI_DOM_RANGE_WEIGHT_ADD_ITEM,
  PRI_DOM_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  PRI_DOM_RANGE_WEIGHT_UPDATE_ITEM,
  PRI_DOM_RANGE_WEIGHT_DELETE_ITEM
} from "../../../constants/actionTypes";

import {
  rangeWeightDomesticError,
  getRangeWeightDomesticListSuccess,
  addRangeWeightDomesticItemSuccess,
  requestUpdateRangeWeightDomesticItemSuccess,
  updateRangeWeightDomesticItemSuccess,
  deleteRangeWeightDomesticItemSuccess,
  getRangeWeightDomesticList,
} from "./actions";

//validate
function validateRangeWeightDomestic(errors) {
  if (errors.name && errors.name.domesticRangeWeightExists) {
    return stopSubmit('range_weight_domestic_action_form', {
      name: 'pri_dom.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.domesticRangeWeightExists) {
    return stopSubmit('range_weight_domestic_action_form', {
      name_en: 'pri_dom.validate-nameEn-exists'
    });
  }
}

/* GET LIST RANGE_WEIGHT DOMESTIC */

function getListRangeWeightDomesticApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/range-weight`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getRangeWeightDomesticListRequest = async (params) => {
  return await getListRangeWeightDomesticApi(params).then(res => res.data).catch(err => err)
};

function* getRangeWeightDomesticListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getRangeWeightDomesticListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getRangeWeightDomesticListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(rangeWeightDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightDomesticError(error));
  }
}

/* ADD RANGE_WEIGHT DOMESTIC */

function addRangeWeightDomesticApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/range-weight/add`,
    headers: authHeader(),
    data: item
  });
}

const addRangeWeightDomesticItemRequest = async item => {
  return await addRangeWeightDomesticApi(item).then(res => res.data).catch(err => err)
};

function* addRangeWeightDomesticItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('range_weight_domestic_action_form'));
  try {
    const response = yield call(addRangeWeightDomesticItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addRangeWeightDomesticItemSuccess());
        yield call(history.push, '/pricing-domestic/range-weight');
        createNotification({ type: 'success', message: 'pri_dom.add-success' });
        break;

      case EC_FAILURE:
        yield put(rangeWeightDomesticError(response.data));
        yield put(validateRangeWeightDomestic(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightDomesticError(error));
  }
}

/* REQUEST RANGE WEIGHT UPDATE ITEM */

const getRangeWeightDomesticUpdateRequest = async (params) => {
  return await getListRangeWeightDomesticApi(params).then(res => res.data).catch(err => err)
};

function* requestRangeWeightDomesticUpdateItems({ payload }) {
  const { param } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getRangeWeightDomesticUpdateRequest, param);
    switch (response.error_code) {
      
      case EC_SUCCESS:
        yield put(requestUpdateRangeWeightDomesticItemSuccess(response.data[0]));
        break;

      case EC_FAILURE:
        yield put(rangeWeightDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightDomesticError(error));
  }
}

/* UPDATE RANGE_WEIGHT DOMESTIC */

function updateRangeWeightDomesticApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/range-weight/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateRangeWeightDomesticItemRequest = async item => {
  return await updateRangeWeightDomesticApi(item).then(res => res.data).catch(err => err)
};

function* updateRangeWeightDomesticItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('range_weight_domestic_action_form'));
  try {
    const response = yield call(updateRangeWeightDomesticItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateRangeWeightDomesticItemSuccess());
        yield call(history.push, '/pricing-domestic/range-weight');
        createNotification({ type: 'success', message: 'pri_dom.update-success' });
        break;

      case EC_FAILURE:
        yield put(rangeWeightDomesticError(response.data));
        yield put(validateRangeWeightDomestic(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightDomesticError(error));
  }
}

/* DELETE RANGE_WEIGHT DOMESTIC */

function deleteRangeWeightDomesticApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/range-weight/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteRangeWeightDomesticItemRequest = async ids => {
  return await deleteRangeWeightDomesticApi(ids).then(res => res.data).catch(err => err)
};

function* deleteRangeWeightDomesticItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteRangeWeightDomesticItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteRangeWeightDomesticItemSuccess());
        yield put(getRangeWeightDomesticList());
        createNotification({ type: 'success', message: 'pri_dom.delete-success'});
        break;

      case EC_FAILURE:
        yield put(rangeWeightDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightDomesticError(error));
  }
}

export function* watchRangeWeightDomesticGetList() {
  yield takeEvery(PRI_DOM_RANGE_WEIGHT_GET_LIST, getRangeWeightDomesticListItems);
}

export function* watchRangeWeightDomesticAddItem() {
  yield takeEvery(PRI_DOM_RANGE_WEIGHT_ADD_ITEM, addRangeWeightDomesticItem);
}

export function* watchRequestRangeWeightDomesticUpdateItem() {
  yield takeEvery(PRI_DOM_RANGE_WEIGHT_REQUEST_UPDATE_ITEM, requestRangeWeightDomesticUpdateItems);
}

export function* watchRangeWeightDomesticUpdateItem() {
  yield takeEvery(PRI_DOM_RANGE_WEIGHT_UPDATE_ITEM, updateRangeWeightDomesticItem);
}

export function* watchRangeWeightDomestiDeleteItem() {
  yield takeEvery(PRI_DOM_RANGE_WEIGHT_DELETE_ITEM, deleteRangeWeightDomesticItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchRangeWeightDomesticGetList),
    fork(watchRangeWeightDomesticAddItem),
    fork(watchRequestRangeWeightDomesticUpdateItem),
    fork(watchRangeWeightDomesticUpdateItem),
    fork(watchRangeWeightDomestiDeleteItem),
  ]);
}
