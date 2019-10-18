import axios from "axios";
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_SPECIAL_PRICING_GET_LIST,
  PRI_SPECIAL_PRICING_ADD_ITEM,
  PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM,
  PRI_SPECIAL_PRICING_UPDATE_ITEM,
  PRI_SPECIAL_PRICING_DELETE_ITEM,
  PRI_SPECIAL_PRICING_GET_DATA,
  PRI_SPECIAL_PRICING_ADD_RANGE_WEIGHT_VALUE,
  PRI_SPECIAL_PRICING_GET_VAS,
  PRI_SPECIAL_PRICING_UPDATE_VAS,
  PRI_SPECIAL_PRICING_GET_FIELD_VAS,
  PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM_SUCCESS,
} from "../../../constants/actionTypes";

import {
  pricingSpecialError,
  getPricingSpecialListSuccess,
  addPricingSpecialItemSuccess,
  requestUpdatePricingSpecialItemSuccess,
  updatePricingSpecialItemSuccess,
  deletePricingSpecialItemSuccess,
  getPricingSpecialList,
  requestUpdatePricingSpecialItem,
  getPricingSpecialDataSuccess,
  addRangeWeightSpecialValueSuccess,
  getPricingSpecialData,
  getPricingSpecialVasSuccess,
  updatePricingSpecialVasSuccess,
  getPricingSpecialFieldVasSuccess
} from "./actions";

//validate
function validatePricingSpecial(errors) {
  if (errors.name && errors.name.specialPricingExists) {
    return stopSubmit('pricing_special_action_form', {
      name: 'pri_special.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.specialPricingExists) {
    return stopSubmit('pricing_special_action_form', {
      name_en: 'pri_special.validate-nameEn-exists'
    });
  }
  if (errors.customer_id && errors.customer_id.specialPricingCustomerExists) {
    return stopSubmit('pricing_special_action_form', {
      customer_id: 'pri_special.validate-customer-exists'
    });
  }
}

/* GET LIST PRICING SPECIAL */

function getListPricingSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPricingSpecialListRequest = async (params) => {
  return await getListPricingSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getPricingSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPricingSpecialListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(pricingSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingSpecialError(error));
  }
}

/* ADD PRICING SPECIAL */

function addPricingSpecialApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/add`,
    headers: authHeader(),
    data: item
  });
}

const addPricingSpecialItemRequest = async item => {
  return await addPricingSpecialApi(item).then(res => res.data).catch(err => err)
};

function* addPricingSpecialItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('pricing_special_action_form'));
  try {
    const response = yield call(addPricingSpecialItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addPricingSpecialItemSuccess());
        yield put(requestUpdatePricingSpecialItem({ query: { id: response.data.pricing_id } }));
        yield take(PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM_SUCCESS);
        yield call(history.push, `/pricing-special/pricing/edit/${response.data.pricing_id}`);
        createNotification({ type: 'success', message: 'pri_special.add-success' });
        break;

      case EC_FAILURE:
        yield put(pricingSpecialError(response.data));
        yield put(validatePricingSpecial(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingSpecialError(error));
  }
}

/* REQUEST RANGE WEIGHT UPDATE ITEM */

const getPricingSpecialUpdateRequest = async (params) => {
  return await getListPricingSpecialApi(params).then(res => res.data).catch(err => err)
};

function* requestPricingSpecialUpdateItems({ payload }) {
  const { param } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingSpecialUpdateRequest, param);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(requestUpdatePricingSpecialItemSuccess(response.data[0]));
        break;

      case EC_FAILURE:
        yield put(pricingSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingSpecialError(error));
  }
}

/* UPDATE PRICING SPECIAL */

function updatePricingSpecialApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/edit`,
    headers: authHeader(),
    data: item
  });
}

const updatePricingSpecialItemRequest = async item => {
  return await updatePricingSpecialApi(item).then(res => res.data).catch(err => err)
};

function* updatePricingSpecialItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('pricing_special_action_form'));
  try {
    const response = yield call(updatePricingSpecialItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updatePricingSpecialItemSuccess());
        yield put(requestUpdatePricingSpecialItem({ query: { id: response.data.pricing_id } }));
        createNotification({ type: 'success', message: 'pri_special.update-success' });
        break;

      case EC_FAILURE:
        yield put(pricingSpecialError(response.data));
        yield put(validatePricingSpecial(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingSpecialError(error));
  }
}

/* DELETE PRICING SPECIAL */

function deletePricingSpecialApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/delete`,
    headers: authHeader(),
    data: { ids: ids }
  });
}

const deletePricingSpecialItemRequest = async ids => {
  return await deletePricingSpecialApi(ids).then(res => res.data).catch(err => err)
};

function* deletePricingSpecialItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deletePricingSpecialItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deletePricingSpecialItemSuccess());
        yield put(getPricingSpecialList());
        createNotification({ type: 'success', message: 'pri_special.delete-success' });
        break;

      case EC_FAILURE:
        yield put(pricingSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingSpecialError(error));
  }
}

/* GET PRICING DATA */

function getDataPricingSpecialApi(pricing_id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/data`,
    headers: authHeader(),
    data: { id: pricing_id }
  });
}

const getPricingSpecialDataRequest = async (pricing_id) => {
  return await getDataPricingSpecialApi(pricing_id).then(res => res.data).catch(err => err)
};

function* getDataPricingSpecialItems({ payload }) {
  const { pricing_id } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingSpecialDataRequest, pricing_id);
    switch (response.error_code) {

      case EC_SUCCESS:
        yield put(getPricingSpecialDataSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingSpecialError(error));
  }
}

/* ADD RANGE WEIGHT VALUE */

function addRangeWeightValueApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/data/add`,
    headers: authHeader(),
    data: item
  });
}

const addRangeWeightValueRequest = async item => {
  return await addRangeWeightValueApi(item).then(res => res.data).catch(err => err)
};

function* addRangeWeightValueItem({ payload }) {
  const { item, toggleModal } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(addRangeWeightValueRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addRangeWeightSpecialValueSuccess());
        yield put(getPricingSpecialData({ id: item.id }));
        yield call(toggleModal);
        createNotification({ type: 'success', message: 'pri_special.update-success' });
        break;

      case EC_FAILURE:
        yield put(pricingSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingSpecialError(error));
  }
}

/* GET PRICING VAS */

function getVasPricingSpecialApi(pricing_id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/vas`,
    headers: authHeader(),
    data: { id: pricing_id }
  });
}

const getPricingSpecialVasRequest = async (pricing_id) => {
  return await getVasPricingSpecialApi(pricing_id).then(res => res.data).catch(err => err)
};

function* getVasPricingSpecialItems({ payload }) {
  const { pricing_id } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingSpecialVasRequest, pricing_id);
    switch (response.error_code) {

      case EC_SUCCESS:
        yield put(getPricingSpecialVasSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingSpecialError(error));
  }
}

/* UPDATE PRICING SPECIAL VAS */

function updatePricingSpecialVasApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/special/vas/add`,
    headers: authHeader(),
    data: item
  });
}

const updatePricingSpecialVasRequest = async item => {
  return await updatePricingSpecialVasApi(item).then(res => res.data).catch(err => err)
};

function* updatePricingSpecialVasItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('pricing_special_vas_action_form'));
  try {
    const response = yield call(updatePricingSpecialVasRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updatePricingSpecialVasSuccess());
        createNotification({ type: 'success', message: 'pri_special.update-success' });
        yield put(stopSubmit('pricing_special_vas_action_form'));
        break;

      case EC_FAILURE:
        yield put(pricingSpecialError(response.data));
        yield put(stopSubmit('pricing_special_vas_action_form'));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingSpecialError(error));
  }
}

/* GET PRICING FIELD VAS */

function getFieldVasPricingSpecialApi() {
  return axios.request({
    method: 'post',
    url: `${apiUrl}field_vas`,
    headers: authHeader(),
  });
}

const getPricingSpecialFieldVasRequest = async () => {
  return await getFieldVasPricingSpecialApi().then(res => res.data).catch(err => err)
};

function* getFieldVasPricingSpecialItems({ payload }) {
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingSpecialFieldVasRequest);
    switch (response.error_code) {

      case EC_SUCCESS:
        yield put(getPricingSpecialFieldVasSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingSpecialError(error));
  }
}

export function* watchPricingSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_PRICING_GET_LIST, getPricingSpecialListItems);
}

export function* watchPricingSpecialAddItem() {
  yield takeEvery(PRI_SPECIAL_PRICING_ADD_ITEM, addPricingSpecialItem);
}

export function* watchRequestPricingSpecialUpdateItem() {
  yield takeEvery(PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM, requestPricingSpecialUpdateItems);
}

export function* watchPricingSpecialUpdateItem() {
  yield takeEvery(PRI_SPECIAL_PRICING_UPDATE_ITEM, updatePricingSpecialItem);
}

export function* watchPricingSpecialDeleteItem() {
  yield takeEvery(PRI_SPECIAL_PRICING_DELETE_ITEM, deletePricingSpecialItem);
}

export function* watchPricingSpecialGetData() {
  yield takeEvery(PRI_SPECIAL_PRICING_GET_DATA, getDataPricingSpecialItems);
}

export function* watchPricingSpecialAddRangeWeightValue() {
  yield takeEvery(PRI_SPECIAL_PRICING_ADD_RANGE_WEIGHT_VALUE, addRangeWeightValueItem);
}

export function* watchPricingSpecialGetVas() {
  yield takeEvery(PRI_SPECIAL_PRICING_GET_VAS, getVasPricingSpecialItems);
}

export function* watchPricingSpecialUpdateVas() {
  yield takeEvery(PRI_SPECIAL_PRICING_UPDATE_VAS, updatePricingSpecialVasItem);
}

export function* watchPricingSpecialGetFieldVas() {
  yield takeEvery(PRI_SPECIAL_PRICING_GET_FIELD_VAS, getFieldVasPricingSpecialItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchPricingSpecialGetList),
    fork(watchPricingSpecialAddItem),
    fork(watchRequestPricingSpecialUpdateItem),
    fork(watchPricingSpecialUpdateItem),
    fork(watchPricingSpecialDeleteItem),
    fork(watchPricingSpecialGetData),
    fork(watchPricingSpecialAddRangeWeightValue),
    fork(watchPricingSpecialGetVas),
    fork(watchPricingSpecialUpdateVas),
    fork(watchPricingSpecialGetFieldVas),
  ]);
}
