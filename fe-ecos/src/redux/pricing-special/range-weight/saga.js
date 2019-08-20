import axios from "axios";
import { eventChannel, END } from 'redux-saga';
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import createNotification from '../../../util/notifications';

import {
  PRI_SPECIAL_RANGE_WEIGHT_GET_LIST,
  PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_REQUEST,
  PRI_SPECIAL_RANGE_WEIGHT_GET_DATA_IMPORT
} from "../../../constants/actionTypes";

import {
  rangeWeightSpecialError,
  getRangeWeightSpecialListSuccess,
  addRangeWeightSpecialItemSuccess,
  requestUpdateRangeWeightSpecialItemSuccess,
  updateRangeWeightSpecialItemSuccess,
  deleteRangeWeightSpecialItemSuccess,
  getRangeWeightSpecialList,
  uploadRangeWeightSpecialProgress,
  uploadRangeWeightSpecialSuccess,
  getDataImportRangeWeightSpecialListSuccess
} from "./actions";

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

/* SPECIAL RANGE WEIGHT IMPORT */

function uploadRangeWeightApi(file, onProgress) {
  const data = new FormData();
  data.append('import_file', file.import_file);
  
  let headers = authHeader();
  headers = {
    ...headers,
    'content-type': `multipart/form-data; boundary=${data._boundary}`,
  }

  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/range-weight/import`,
    headers: headers,
    data: data,
    onUploadProgress: onProgress
  });
}

const getUploadRangeWeightRequest = async (file, onProgress) => {
  return await uploadRangeWeightApi(file, onProgress).then(res => res.data).catch(err => err)
};

function createUploader(payload) {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => { };
  });

  const uploadPromise = getUploadRangeWeightRequest(payload, (event) => {
    const percentage = Math.round((event.loaded * 100) / event.total)
    emit(percentage);
    if (percentage === 100) {
      emit(END);
    }
  });

  return [uploadPromise, chan];
}

function* watchOnProgress(chan) {
  while (true) {
    const progress = yield take(chan);
    yield put(uploadRangeWeightSpecialProgress(progress));
  }
}

function* uploadRangeWeightSpecial({ payload }) {
  const { pathname } = history.location;
  const [uploadPromise, chan] = createUploader(payload);
  yield fork(watchOnProgress, chan);

  try {
    const response = yield call(() => uploadPromise);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(uploadRangeWeightSpecialSuccess(response.data, response.total));
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
  } catch (err) {
    console.log(err);
  }
}

/* GET DATA IMPORT RANGE WEIGHT SPECIAL */

function getDataImportRangeWeightSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/range-weight/import`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDataImportRangeWeightSpecialListRequest = async (params) => {
  return await getDataImportRangeWeightSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getDataImportRangeWeightSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDataImportRangeWeightSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDataImportRangeWeightSpecialListSuccess(response.data, response.total));
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

export function* watchUploadRangeWeightSpecial() {
  yield takeEvery(PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_REQUEST, uploadRangeWeightSpecial);
}

export function* watchgetDataImportRangeWeightSpecial() {
  yield takeEvery(PRI_SPECIAL_RANGE_WEIGHT_GET_DATA_IMPORT, getDataImportRangeWeightSpecialListItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchRangeWeightSpecialGetList),
    fork(watchRangeWeightSpecialAddItem),
    fork(watchRequestRangeWeightSpecialUpdateItem),
    fork(watchRangeWeightSpecialUpdateItem),
    fork(watchRangeWeightSpecialDeleteItem),
    fork(watchUploadRangeWeightSpecial),
    fork(watchgetDataImportRangeWeightSpecial)
  ]);
}
