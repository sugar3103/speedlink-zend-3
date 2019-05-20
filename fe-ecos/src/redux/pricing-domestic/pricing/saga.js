import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
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
  PRI_DOM_PRICING_DELETE_ITEM
} from "../../../constants/actionTypes";

import {
  pricingDomesticError,
  getPricingDomesticListSuccess,
  addPricingDomesticItemSuccess,
  requestUpdatePricingDomesticItemSuccess,
  updatePricingDomesticItemSuccess,
  deletePricingDomesticItemSuccess,
  getPricingDomesticList,
  requestUpdatePricingDomesticItem
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
    url: `${apiUrl}pricing/domestic/range-weight/delete`,
    headers: authHeader(),
    data: {  ids: ids }
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
        createNotification({ type: 'success', message: 'pri_dom.delete-success'});
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

export function* watchPricingDomestiDeleteItem() {
  yield takeEvery(PRI_DOM_PRICING_DELETE_ITEM, deletePricingDomesticItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchPricingDomesticGetList),
    fork(watchPricingDomesticAddItem),
    fork(watchRequestPricingDomesticUpdateItem),
    fork(watchPricingDomesticUpdateItem),
    fork(watchPricingDomestiDeleteItem),
  ]);
}
