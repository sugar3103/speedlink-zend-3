import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_INT_RANGE_WEIGHT_GET_LIST,
  PRI_INT_RANGE_WEIGHT_ADD_ITEM,
  PRI_INT_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  PRI_INT_RANGE_WEIGHT_UPDATE_ITEM,
  PRI_INT_RANGE_WEIGHT_DELETE_ITEM
} from "../../../constants/actionTypes";

import {
  rangeWeightInternationalError,
  getRangeWeightInternationalListSuccess,
  addRangeWeightInternationalItemSuccess,
  requestUpdateRangeWeightInternationalItemSuccess,
  updateRangeWeightInternationalItemSuccess,
  deleteRangeWeightInternationalItemSuccess,
  getRangeWeightInternationalList,
} from "./actions";

//validate
function validateRangeWeightInternational(errors) {
  if (errors.name && errors.name.internationalRangeWeightExists) {
    return stopSubmit('range_weight_international_action_form', {
      name: 'pri_int.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.internationalRangeWeightExists) {
    return stopSubmit('range_weight_international_action_form', {
      name_en: 'pri_int.validate-nameEn-exists'
    });
  }
}

/* GET LIST RANGE_WEIGHT INTERNATIONAL */

function getListRangeWeightInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}range-weight`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getRangeWeightInternationalListRequest = async (params) => {
  return await getListRangeWeightInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getRangeWeightInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getRangeWeightInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getRangeWeightInternationalListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(rangeWeightInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightInternationalError(error));
  }
}

/* ADD RANGE_WEIGHT INTERNATIONAL */

function addRangeWeightInternationalApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}range-weight/add`,
    headers: authHeader(),
    data: item
  });
}

const addRangeWeightInternationalItemRequest = async item => {
  return await addRangeWeightInternationalApi(item).then(res => res.data).catch(err => err)
};

function* addRangeWeightInternationalItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('range_weight_international_action_form'));
  try {
    const response = yield call(addRangeWeightInternationalItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addRangeWeightInternationalItemSuccess());
        yield call(history.push, '/pricing-international/range-weight');
        createNotification({ type: 'success', message: 'pri_int.add-success' });
        break;

      case EC_FAILURE:
        yield put(rangeWeightInternationalError(response.data));
        yield put(validateRangeWeightInternational(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightInternationalError(error));
  }
}

/* REQUEST RANGE WEIGHT UPDATE ITEM */

const getRangeWeightInternationalUpdateRequest = async (params) => {
  return await getListRangeWeightInternationalApi(params).then(res => res.data).catch(err => err)
};

function* requestRangeWeightInternationalUpdateItems({ payload }) {
  const { param } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getRangeWeightInternationalUpdateRequest, param);
    switch (response.error_code) {
      
      case EC_SUCCESS:
        yield put(requestUpdateRangeWeightInternationalItemSuccess(response.data[0]));
        break;

      case EC_FAILURE:
        yield put(rangeWeightInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightInternationalError(error));
  }
}

/* UPDATE RANGE_WEIGHT INTERNATIONAL */

function updateRangeWeightInternationalApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}range-weight/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateRangeWeightInternationalItemRequest = async item => {
  return await updateRangeWeightInternationalApi(item).then(res => res.data).catch(err => err)
};

function* updateRangeWeightInternationalItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('range_weight_international_action_form'));
  try {
    const response = yield call(updateRangeWeightInternationalItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateRangeWeightInternationalItemSuccess());
        yield call(history.push, '/pricing-international/range-weight');
        createNotification({ type: 'success', message: 'pri_int.update-success' });
        break;

      case EC_FAILURE:
        yield put(rangeWeightInternationalError(response.data));
        yield put(validateRangeWeightInternational(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightInternationalError(error));
  }
}

/* DELETE RANGE_WEIGHT INTERNATIONAL */

function deleteRangeWeightInternationalApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}range-weight/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteRangeWeightInternationalItemRequest = async ids => {
  return await deleteRangeWeightInternationalApi(ids).then(res => res.data).catch(err => err)
};

function* deleteRangeWeightInternationalItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteRangeWeightInternationalItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteRangeWeightInternationalItemSuccess());
        yield put(getRangeWeightInternationalList());
        createNotification({ type: 'success', message: 'pri_int.delete-success'});
        break;

      case EC_FAILURE:
        yield put(rangeWeightInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(rangeWeightInternationalError(error));
  }
}

export function* watchRangeWeightInternationalGetList() {
  yield takeEvery(PRI_INT_RANGE_WEIGHT_GET_LIST, getRangeWeightInternationalListItems);
}

export function* watchRangeWeightInternationalAddItem() {
  yield takeEvery(PRI_INT_RANGE_WEIGHT_ADD_ITEM, addRangeWeightInternationalItem);
}

export function* watchRequestRangeWeightInternationalUpdateItem() {
  yield takeEvery(PRI_INT_RANGE_WEIGHT_REQUEST_UPDATE_ITEM, requestRangeWeightInternationalUpdateItems);
}

export function* watchRangeWeightInternationalUpdateItem() {
  yield takeEvery(PRI_INT_RANGE_WEIGHT_UPDATE_ITEM, updateRangeWeightInternationalItem);
}

export function* watchRangeWeightInternationalDeleteItem() {
  yield takeEvery(PRI_INT_RANGE_WEIGHT_DELETE_ITEM, deleteRangeWeightInternationalItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchRangeWeightInternationalGetList),
    fork(watchRangeWeightInternationalAddItem),
    fork(watchRequestRangeWeightInternationalUpdateItem),
    fork(watchRangeWeightInternationalUpdateItem),
    fork(watchRangeWeightInternationalDeleteItem),
  ]);
}
