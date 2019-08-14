import axios from "axios";
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { startSubmit, stopSubmit } from 'redux-form';
import createNotification from '../../../util/notifications';

import {
  PRI_DOM_PRICING_GET_LIST,
  PRI_DOM_PRICING_ADD_ITEM,
  PRI_DOM_PRICING_REQUEST_UPDATE_ITEM,
  PRI_DOM_PRICING_UPDATE_ITEM,
  PRI_DOM_PRICING_DELETE_ITEM,
  PRI_DOM_PRICING_GET_DATA,
  PRI_DOM_PRICING_ADD_RANGE_WEIGHT_VALUE,
  PRI_DOM_PRICING_GET_VAS,
  PRI_DOM_PRICING_UPDATE_VAS,
  PRI_DOM_PRICING_GET_FIELD_VAS,
  PRI_DOM_PRICING_REQUEST_UPDATE_ITEM_SUCCESS,
} from "../../../constants/actionTypes";

import {
  pricingDomesticError,
  getPricingDomesticListSuccess,
  addPricingDomesticItemSuccess,
  requestUpdatePricingDomesticItemSuccess,
  updatePricingDomesticItemSuccess,
  deletePricingDomesticItemSuccess,
  getPricingDomesticList,
  requestUpdatePricingDomesticItem,
  getPricingDomesticDataSuccess,
  addRangeWeightDomesticValueSuccess,
  getPricingDomesticData,
  getPricingDomesticVasSuccess,
  updatePricingDomesticVasSuccess,
  getPricingDomesticFieldVasSuccess
} from "./actions";

//validate
function validatePricingDomestic(errors) {
  if (errors.name && errors.name.domesticPricingExists) {
    return stopSubmit('pricing_domestic_action_form', {
      name: 'pri_dom.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.domesticPricingExists) {
    return stopSubmit('pricing_domestic_action_form', {
      name_en: 'pri_dom.validate-nameEn-exists'
    });
  }
  if (errors.customer_id && errors.customer_id.domesticPricingCustomerExists) {
    return stopSubmit('pricing_domestic_action_form', {
      customer_id: 'pri_dom.validate-customer-exists'
    });
  }
}

/* GET LIST PRICING DOMESTIC */

function getListPricingDomesticApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPricingDomesticListRequest = async (params) => {
  return await getListPricingDomesticApi(params).then(res => res.data).catch(err => err)
};

function* getPricingDomesticListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingDomesticListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPricingDomesticListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(pricingDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingDomesticError(error));
  }
}

/* ADD PRICING DOMESTIC */

function addPricingDomesticApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/add`,
    headers: authHeader(),
    data: item
  });
}

const addPricingDomesticItemRequest = async item => {
  return await addPricingDomesticApi(item).then(res => res.data).catch(err => err)
};

function* addPricingDomesticItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('pricing_domestic_action_form'));
  try {
    const response = yield call(addPricingDomesticItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addPricingDomesticItemSuccess());
        yield put(requestUpdatePricingDomesticItem({ query: { id: response.data.pricing_id } }));
        yield take(PRI_DOM_PRICING_REQUEST_UPDATE_ITEM_SUCCESS);
        yield call(history.push, `/pricing-domestic/pricing/edit/${response.data.pricing_id}`);
        createNotification({ type: 'success', message: 'pri_dom.add-success' });
        break;

      case EC_FAILURE:
        yield put(pricingDomesticError(response.data));
        yield put(validatePricingDomestic(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingDomesticError(error));
  }
}

/* REQUEST RANGE WEIGHT UPDATE ITEM */

const getPricingDomesticUpdateRequest = async (params) => {
  return await getListPricingDomesticApi(params).then(res => res.data).catch(err => err)
};

function* requestPricingDomesticUpdateItems({ payload }) {
  const { param } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingDomesticUpdateRequest, param);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(requestUpdatePricingDomesticItemSuccess(response.data[0]));
        break;

      case EC_FAILURE:
        yield put(pricingDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingDomesticError(error));
  }
}

/* UPDATE PRICING DOMESTIC */

function updatePricingDomesticApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/edit`,
    headers: authHeader(),
    data: item
  });
}

const updatePricingDomesticItemRequest = async item => {
  return await updatePricingDomesticApi(item).then(res => res.data).catch(err => err)
};

function* updatePricingDomesticItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('pricing_domestic_action_form'));
  try {
    const response = yield call(updatePricingDomesticItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updatePricingDomesticItemSuccess());
        yield put(requestUpdatePricingDomesticItem({ query: { id: response.data.pricing_id } }));
        createNotification({ type: 'success', message: 'pri_dom.update-success' });
        break;

      case EC_FAILURE:
        yield put(pricingDomesticError(response.data));
        yield put(validatePricingDomestic(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingDomesticError(error));
  }
}

/* DELETE PRICING DOMESTIC */

function deletePricingDomesticApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/delete`,
    headers: authHeader(),
    data: { ids: ids }
  });
}

const deletePricingDomesticItemRequest = async ids => {
  return await deletePricingDomesticApi(ids).then(res => res.data).catch(err => err)
};

function* deletePricingDomesticItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deletePricingDomesticItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deletePricingDomesticItemSuccess());
        yield put(getPricingDomesticList());
        createNotification({ type: 'success', message: 'pri_dom.delete-success' });
        break;

      case EC_FAILURE:
        yield put(pricingDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingDomesticError(error));
  }
}

/* GET PRICING DATA */

function getDataPricingDomesticApi(pricing_id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/data`,
    headers: authHeader(),
    data: { id: pricing_id }
  });
}

const getPricingDomesticDataRequest = async (pricing_id) => {
  return await getDataPricingDomesticApi(pricing_id).then(res => res.data).catch(err => err)
};

function* getDataPricingDomesticItems({ payload }) {
  const { pricing_id } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingDomesticDataRequest, pricing_id);
    switch (response.error_code) {

      case EC_SUCCESS:
        yield put(getPricingDomesticDataSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingDomesticError(error));
  }
}

/* ADD RANGE WEIGHT VALUE */

function addRangeWeightValueApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/data/add`,
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
        yield put(addRangeWeightDomesticValueSuccess());
        yield put(getPricingDomesticData({ id: item.id }));
        yield call(toggleModal);
        createNotification({ type: 'success', message: 'pri_dom.update-success' });
        break;

      case EC_FAILURE:
        yield put(pricingDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingDomesticError(error));
  }
}

/* GET PRICING VAS */

function getVasPricingDomesticApi(pricing_id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/vas`,
    headers: authHeader(),
    data: { id: pricing_id }
  });
}

const getPricingDomesticVasRequest = async (pricing_id) => {
  return await getVasPricingDomesticApi(pricing_id).then(res => res.data).catch(err => err)
};

function* getVasPricingDomesticItems({ payload }) {
  const { pricing_id } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingDomesticVasRequest, pricing_id);
    switch (response.error_code) {

      case EC_SUCCESS:
        yield put(getPricingDomesticVasSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingDomesticError(error));
  }
}

/* UPDATE PRICING DOMESTIC VAS */

function updatePricingDomesticVasApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/domestic/vas/add`,
    headers: authHeader(),
    data: item
  });
}

const updatePricingDomesticVasRequest = async item => {
  return await updatePricingDomesticVasApi(item).then(res => res.data).catch(err => err)
};

function* updatePricingDomesticVasItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('pricing_domestic_vas_action_form'));
  try {
    const response = yield call(updatePricingDomesticVasRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updatePricingDomesticVasSuccess());
        createNotification({ type: 'success', message: 'pri_dom.update-success' });
        yield put(stopSubmit('pricing_domestic_vas_action_form'));
        break;

      case EC_FAILURE:
        yield put(pricingDomesticError(response.data));
        yield put(stopSubmit('pricing_domestic_vas_action_form'));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingDomesticError(error));
  }
}

/* GET PRICING FIELD VAS */

function getFieldVasPricingDomesticApi() {
  return axios.request({
    method: 'post',
    url: `${apiUrl}field_vas`,
    headers: authHeader(),
  });
}

const getPricingDomesticFieldVasRequest = async () => {
  return await getFieldVasPricingDomesticApi().then(res => res.data).catch(err => err)
};

function* getFieldVasPricingDomesticItems({ payload }) {
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingDomesticFieldVasRequest);
    switch (response.error_code) {

      case EC_SUCCESS:
        yield put(getPricingDomesticFieldVasSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingDomesticError(error));
  }
}

export function* watchPricingDomesticGetList() {
  yield takeEvery(PRI_DOM_PRICING_GET_LIST, getPricingDomesticListItems);
}

export function* watchPricingDomesticAddItem() {
  yield takeEvery(PRI_DOM_PRICING_ADD_ITEM, addPricingDomesticItem);
}

export function* watchRequestPricingDomesticUpdateItem() {
  yield takeEvery(PRI_DOM_PRICING_REQUEST_UPDATE_ITEM, requestPricingDomesticUpdateItems);
}

export function* watchPricingDomesticUpdateItem() {
  yield takeEvery(PRI_DOM_PRICING_UPDATE_ITEM, updatePricingDomesticItem);
}

export function* watchPricingDomesticDeleteItem() {
  yield takeEvery(PRI_DOM_PRICING_DELETE_ITEM, deletePricingDomesticItem);
}

export function* watchPricingDomesticGetData() {
  yield takeEvery(PRI_DOM_PRICING_GET_DATA, getDataPricingDomesticItems);
}

export function* watchPricingDomesticAddRangeWeightValue() {
  yield takeEvery(PRI_DOM_PRICING_ADD_RANGE_WEIGHT_VALUE, addRangeWeightValueItem);
}

export function* watchPricingDomesticGetVas() {
  yield takeEvery(PRI_DOM_PRICING_GET_VAS, getVasPricingDomesticItems);
}

export function* watchPricingDomesticUpdateVas() {
  yield takeEvery(PRI_DOM_PRICING_UPDATE_VAS, updatePricingDomesticVasItem);
}

export function* watchPricingDomesticGetFieldVas() {
  yield takeEvery(PRI_DOM_PRICING_GET_FIELD_VAS, getFieldVasPricingDomesticItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchPricingDomesticGetList),
    fork(watchPricingDomesticAddItem),
    fork(watchRequestPricingDomesticUpdateItem),
    fork(watchPricingDomesticUpdateItem),
    fork(watchPricingDomesticDeleteItem),
    fork(watchPricingDomesticGetData),
    fork(watchPricingDomesticAddRangeWeightValue),
    fork(watchPricingDomesticGetVas),
    fork(watchPricingDomesticUpdateVas),
    fork(watchPricingDomesticGetFieldVas),
  ]);
}
