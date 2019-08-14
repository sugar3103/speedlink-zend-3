import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_SPECIAL_RANGE_WEIGHT_GET_LIST,
  PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM
} from "../../../constants/actionTypes";

import {
  rangeWeightSpecialError,
  getRangeWeightSpecialListSuccess,
  addRangeWeightSpecialItemSuccess,
  requestUpdateRangeWeightSpecialItemSuccess,
  updateRangeWeightSpecialItemSuccess,
  deleteRangeWeightSpecialItemSuccess,
  getRangeWeightSpecialList,
} from "./actions";

//validate
function validateRangeWeightSpecial(errors) {
  if (errors.name && errors.name.specialRangeWeightExists) {
    return stopSubmit('range_weight_special_action_form', {
      name: 'pri_special.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.specialRangeWeightExists) {
    return stopSubmit('range_weight_special_action_form', {
      name_en: 'pri_special.validate-nameEn-exists'
    });
  }
}

/* GET LIST RANGE_WEIGHT SPECIAL */

function getListRangeWeightSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/range-weight`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getRangeWeightSpecialListRequest = async (params) => {
  return await getListRangeWeightSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getRangeWeightSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getRangeWeightSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getRangeWeightSpecialListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(rangeWeightSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightSpecialError(error));
  }
}

/* ADD RANGE_WEIGHT SPECIAL */

function addRangeWeightSpecialApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/range-weight/add`,
    headers: authHeader(),
    data: item
  });
}

const addRangeWeightSpecialItemRequest = async item => {
  return await addRangeWeightSpecialApi(item).then(res => res.data).catch(err => err)
};

function* addRangeWeightSpecialItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('range_weight_special_action_form'));
  try {
    const response = yield call(addRangeWeightSpecialItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addRangeWeightSpecialItemSuccess());
        yield call(history.push, '/pricing-special/range-weight');
        createNotification({ type: 'success', message: 'pri_special.add-success' });
        break;

      case EC_FAILURE:
        yield put(rangeWeightSpecialError(response.data));
        yield put(validateRangeWeightSpecial(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightSpecialError(error));
  }
}

/* REQUEST RANGE WEIGHT UPDATE ITEM */

const getRangeWeightSpecialUpdateRequest = async (params) => {
  return await getListRangeWeightSpecialApi(params).then(res => res.data).catch(err => err)
};

function* requestRangeWeightSpecialUpdateItems({ payload }) {
  const { param } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getRangeWeightSpecialUpdateRequest, param);
    switch (response.error_code) {
      
      case EC_SUCCESS:
        yield put(requestUpdateRangeWeightSpecialItemSuccess(response.data[0]));
        break;

      case EC_FAILURE:
        yield put(rangeWeightSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightSpecialError(error));
  }
}

/* UPDATE RANGE_WEIGHT SPECIAL */

function updateRangeWeightSpecialApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/range-weight/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateRangeWeightSpecialItemRequest = async item => {
  return await updateRangeWeightSpecialApi(item).then(res => res.data).catch(err => err)
};

function* updateRangeWeightSpecialItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('range_weight_special_action_form'));
  try {
    const response = yield call(updateRangeWeightSpecialItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateRangeWeightSpecialItemSuccess());
        yield call(history.push, '/pricing-special/range-weight');
        createNotification({ type: 'success', message: 'pri_special.update-success' });
        break;

      case EC_FAILURE:
        yield put(rangeWeightSpecialError(response.data));
        yield put(validateRangeWeightSpecial(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightSpecialError(error));
  }
}

/* DELETE RANGE_WEIGHT SPECIAL */

function deleteRangeWeightSpecialApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/range-weight/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteRangeWeightSpecialItemRequest = async ids => {
  return await deleteRangeWeightSpecialApi(ids).then(res => res.data).catch(err => err)
};

function* deleteRangeWeightSpecialItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteRangeWeightSpecialItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteRangeWeightSpecialItemSuccess());
        yield put(getRangeWeightSpecialList());
        createNotification({ type: 'success', message: 'pri_special.delete-success'});
        break;

      case EC_FAILURE:
        yield put(rangeWeightSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightSpecialError(error));
  }
}

export function* watchRangeWeightSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_RANGE_WEIGHT_GET_LIST, getRangeWeightSpecialListItems);
}

export function* watchRangeWeightSpecialAddItem() {
  yield takeEvery(PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM, addRangeWeightSpecialItem);
}

export function* watchRequestRangeWeightSpecialUpdateItem() {
  yield takeEvery(PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM, requestRangeWeightSpecialUpdateItems);
}

export function* watchRangeWeightSpecialUpdateItem() {
  yield takeEvery(PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM, updateRangeWeightSpecialItem);
}

export function* watchRangeWeightSpecialDeleteItem() {
  yield takeEvery(PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM, deleteRangeWeightSpecialItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchRangeWeightSpecialGetList),
    fork(watchRangeWeightSpecialAddItem),
    fork(watchRequestRangeWeightSpecialUpdateItem),
    fork(watchRangeWeightSpecialUpdateItem),
    fork(watchRangeWeightSpecialDeleteItem),
  ]);
}
