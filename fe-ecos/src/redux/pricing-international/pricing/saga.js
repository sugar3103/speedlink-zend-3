import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_INT_PRICING_GET_LIST,
  PRI_INT_PRICING_ADD_ITEM,
  PRI_INT_PRICING_REQUEST_UPDATE_ITEM,
  PRI_INT_PRICING_UPDATE_ITEM,
  PRI_INT_PRICING_DELETE_ITEM,
  PRI_INT_PRICING_GET_DATA,
  PRI_INT_PRICING_UPDATE_DATA,
  PRI_INT_PRICING_GET_VAS,
  PRI_INT_PRICING_UPDATE_VAS,
  PRI_INT_PRICING_GET_FIELD_VAS,
} from "../../../constants/actionTypes";

import {
  pricingInternationalError,
  getPricingInternationalListSuccess,
  addPricingInternationalItemSuccess,
  requestUpdatePricingInternationalItemSuccess,
  updatePricingInternationalItemSuccess,
  deletePricingInternationalItemSuccess,
  getPricingInternationalList,
  requestUpdatePricingInternationalItem,
  getPricingInternationalDataSuccess,
  updatePricingInternationalDataSuccess,
  getPricingInternationalVasSuccess,
  updatePricingInternationalVasSuccess,
  getPricingInternationalFieldVasSuccess
} from "./actions";

//validate
function validatePricingInternational(errors) {
  if (errors.name && errors.name.internationalPricingExists) {
    return stopSubmit('pricing_international_action_form', {
      name: 'pri_int.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.internationalPricingExists) {
    return stopSubmit('pricing_international_action_form', {
      name_en: 'pri_int.validate-nameEn-exists'
    });
  }
}

/* GET LIST PRICING INTERNATIONAL */

function getListPricingInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPricingInternationalListRequest = async (params) => {
  return await getListPricingInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getPricingInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPricingInternationalListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(pricingInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingInternationalError(error));
  }
}

/* ADD PRICING INTERNATIONAL */

function addPricingInternationalApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/add`,
    headers: authHeader(),
    data: item
  });
}

const addPricingInternationalItemRequest = async item => {
  return await addPricingInternationalApi(item).then(res => res.data).catch(err => err)
};

function* addPricingInternationalItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('pricing_international_action_form'));
  try {
    const response = yield call(addPricingInternationalItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addPricingInternationalItemSuccess());
        yield call(history.push, `/pricing-international/pricing/edit/${response.data}`);
        createNotification({ type: 'success', message: 'pri_int.add-success' });
        break;

      case EC_FAILURE:
        yield put(pricingInternationalError(response.data));
        yield put(validatePricingInternational(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingInternationalError(error));
  }
}

/* REQUEST PRICING UPDATE ITEM */

const getPricingInternationalUpdateRequest = async (params) => {
  return await getListPricingInternationalApi(params).then(res => res.data).catch(err => err)
};

function* requestPricingInternationalUpdateItems({ payload }) {
  const { param } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingInternationalUpdateRequest, param);
    switch (response.error_code) {
      
      case EC_SUCCESS:
        yield put(requestUpdatePricingInternationalItemSuccess(response.data[0]));
        break;

      case EC_FAILURE:
        yield put(pricingInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingInternationalError(error));
  }
}

/* UPDATE PRICING INTERNATIONAL */

function updatePricingInternationalApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/edit`,
    headers: authHeader(),
    data: item
  });
}

const updatePricingInternationalItemRequest = async item => {
  return await updatePricingInternationalApi(item).then(res => res.data).catch(err => err)
};

function* updatePricingInternationalItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('pricing_international_action_form'));
  try {
    const response = yield call(updatePricingInternationalItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updatePricingInternationalItemSuccess());
        yield put(requestUpdatePricingInternationalItem({ query: { id: response.data.pricing_id } }));
        createNotification({ type: 'success', message: 'pri_int.update-success' });
        break;

      case EC_FAILURE:
        yield put(pricingInternationalError(response.data));
        yield put(validatePricingInternational(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingInternationalError(error));
  }
}

/* DELETE PRICING INTERNATIONAL */

function deletePricingInternationalApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deletePricingInternationalItemRequest = async ids => {
  return await deletePricingInternationalApi(ids).then(res => res.data).catch(err => err)
};

function* deletePricingInternationalItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deletePricingInternationalItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deletePricingInternationalItemSuccess());
        yield put(getPricingInternationalList());
        createNotification({ type: 'success', message: 'pri_int.delete-success'});
        break;

      case EC_FAILURE:
        yield put(pricingInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingInternationalError(error));
  }
}

/* GET PRICING DATA */

function getDataPricingInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing_data`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPricingInternationalDataRequest = async (params) => {
  return await getDataPricingInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getDataPricingInternationalItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingInternationalDataRequest, params);
    switch (response.error_code) {
      
      case EC_SUCCESS:
        yield put(getPricingInternationalDataSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingInternationalError(error));
  }
}

/* UPDATE PRICING INTERNATIONAL DATA */
function updatePricingInternationalDataApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing_data/edit`,
    headers: authHeader(),
    data: item
  });
}

const updatePricingInternationalDataItemRequest = async item => {
  return await updatePricingInternationalDataApi(item).then(res => res.data).catch(err => err)
};

function* updatePricingInternationalDataItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(updatePricingInternationalDataItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updatePricingInternationalDataSuccess());
        createNotification({ type: 'success',  message: 'pri_int.update-success' });
        break;

      case EC_FAILURE:
        yield put(pricingInternationalError(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingInternationalError(error));
  }
}

/* GET PRICING VAS */

function getVasPricingInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing_vas`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPricingInternationalVasRequest = async (params) => {
  return await getVasPricingInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getVasPricingInternationalItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingInternationalVasRequest, params);
    switch (response.error_code) {
      
      case EC_SUCCESS:
        yield put(getPricingInternationalVasSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingInternationalError(error));
  }
}

/* UPDATE PRICING INTERNATIONAL VAS */

function updatePricingInternationalVasApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing_vas/updateVas`,
    headers: authHeader(),
    data: item
  });
}

const updatePricingInternationalVasRequest = async item => {
  return await updatePricingInternationalVasApi(item).then(res => res.data).catch(err => err)
};

function* updatePricingInternationalVasItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(updatePricingInternationalVasRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updatePricingInternationalVasSuccess());
        createNotification({ type: 'success', message: 'pri_int.update-success' });
        break;

      case EC_FAILURE:
        yield put(pricingInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingInternationalError(error));
  }
}

/* GET PRICING FIELD VAS */

function getFieldVasPricingInternationalApi() {
  return axios.request({
    method: 'post',
    url: `${apiUrl}field_vas`,
    headers: authHeader(),
  });
}

const getPricingInternationalFieldVasRequest = async () => {
  return await getFieldVasPricingInternationalApi().then(res => res.data).catch(err => err)
};

function* getFieldVasPricingInternationalItems({ payload }) {
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingInternationalFieldVasRequest);
    switch (response.error_code) {
      
      case EC_SUCCESS:
        yield put(getPricingInternationalFieldVasSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingInternationalError(error));
  }
}

export function* watchPricingInternationalGetList() {
  yield takeEvery(PRI_INT_PRICING_GET_LIST, getPricingInternationalListItems);
}

export function* watchPricingInternationalAddItem() {
  yield takeEvery(PRI_INT_PRICING_ADD_ITEM, addPricingInternationalItem);
}

export function* watchRequestPricingInternationalUpdateItem() {
  yield takeEvery(PRI_INT_PRICING_REQUEST_UPDATE_ITEM, requestPricingInternationalUpdateItems);
}

export function* watchPricingInternationalUpdateItem() {
  yield takeEvery(PRI_INT_PRICING_UPDATE_ITEM, updatePricingInternationalItem);
}

export function* watchPricingInternationalDeleteItem() {
  yield takeEvery(PRI_INT_PRICING_DELETE_ITEM, deletePricingInternationalItem);
}

export function* watchPricingInternationalGetData() {
  yield takeEvery(PRI_INT_PRICING_GET_DATA, getDataPricingInternationalItems);
}

export function* watchPricingInternationalUpdateData() {
  yield takeEvery(PRI_INT_PRICING_UPDATE_DATA, updatePricingInternationalDataItem);
}

export function* watchPricingInternationalGetVas() {
  yield takeEvery(PRI_INT_PRICING_GET_VAS, getVasPricingInternationalItems);
}

export function* watchPricingInternationalUpdateVas() {
  yield takeEvery(PRI_INT_PRICING_UPDATE_VAS, updatePricingInternationalVasItem);
}

export function* watchPricingInternationalGetFieldVas() {
  yield takeEvery(PRI_INT_PRICING_GET_FIELD_VAS, getFieldVasPricingInternationalItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchPricingInternationalGetList),
    fork(watchPricingInternationalAddItem),
    fork(watchRequestPricingInternationalUpdateItem),
    fork(watchPricingInternationalUpdateItem),
    fork(watchPricingInternationalDeleteItem),
    fork(watchPricingInternationalGetData),
    fork(watchPricingInternationalUpdateData),
    fork(watchPricingInternationalGetVas),
    fork(watchPricingInternationalUpdateVas),
    fork(watchPricingInternationalGetFieldVas),
  ]);
}
