import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  PRICING_CUSTOMER_GET_LIST,
  PRICING_SALEMAN_GET_LIST,
  PRICING_CARRIER_GET_LIST,
  PRICING_GET_LIST,
  PRICING_ADD_MASTER_DATA,
  PRICING_GET_DATA,
  PRICING_UPDATE_DATA,
  PRICING_GET_VAS,
  PRICING_UPDATE_VAS
} from "../../../constants/actionTypes";

import {
  pricingError,
  getCustomerPricingListSuccess,
  getSalemanPricingListSuccess,
  getCarrierPricingListSuccess,
  getPricingListSuccess,
  addPricingMasterDataItemSuccess,
  getPricingData,
  getPricingDataSuccess,
  updatePricingDataItemSuccess,
  getPricingVasSuccess,
  updatePricingVasItemSuccess
} from "./actions";

import createNotification from '../../../util/notifications';

/* GET LIST CODE CONDITIONS */

function getCodeByConditionApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/codeByCondition`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCodeByConditionListRequest = async (params) => {
  return await getCodeByConditionApi(params).then(res => res.data).catch(err => err)
};

/* GET CUSTOMER PRICING LIST */

function* getCustomerPricingListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCodeByConditionListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCustomerPricingListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(pricingError(error));
  }
}

/* GET SALEMAN PRICING LIST */

function* getSalemanPricingListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCodeByConditionListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getSalemanPricingListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(pricingError(error));
  }
}

/* GET CARRIER PRICING LIST */

function* getCarrierPricingListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCodeByConditionListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCarrierPricingListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(pricingError(error));
  }
}

/* GET LIST PRICING */

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPricingListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getPricingListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPricingListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(pricingError(error));
  }
}

//add pricing master data

function addPricingMasterDataApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing/add`,
    headers: authHeader(),
    data: item
  });
}

const addPricingMasterDataItemRequest = async item => {
  return await addPricingMasterDataApi(item).then(res => res.data).catch(err => err)
};

function* addPricingMasterDataItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(addPricingMasterDataItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addPricingMasterDataItemSuccess());
        createNotification({ type: 'success', message: 'pricing.add-success' });
        const params = {
          query: {
            pricing_id: response.data
          }
        };
        yield put(getPricingData(params));
        yield call(history.push, `/pricing-international/pricing/edit/${response.data}`);
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingError(error));
  }
}

//get pricing data
function getPricingDataApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing_data`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPricingDataItemsRequest = async (params) => {
  return await getPricingDataApi(params).then(res => res.data).catch(err => err)
};

function* getPricingDataItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingDataItemsRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPricingDataSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(pricingError(error));
  }
}

//update pricing data
function updatePricingDataApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing_data/edit`,
    headers: authHeader(),
    data: params
  });
}

const updatePricingDataItemRequest = async params => {
  return await updatePricingDataApi(params).then(res => res.data).catch(err => err)
};

function* updatePricingDataItem({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(updatePricingDataItemRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updatePricingDataItemSuccess());
        createNotification({ type: 'success',  message: 'pricing.update-data-success' });
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingError(error));
  }
}

//get pricing vas
function getPricingVasApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing_vas`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPricingVasItemsRequest = async (params) => {
  return await getPricingVasApi(params).then(res => res.data).catch(err => err)
};

function* getPricingVasItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingVasItemsRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPricingVasSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(pricingError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(pricingError(error));
  }
}

//update pricing vas
function updatePricingVasApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}pricing_vas/updateVas`,
    headers: authHeader(),
    data: params
  });
}

const updatePricingVasItemRequest = async params => {
  return await updatePricingVasApi(params).then(res => res.data).catch(err => err)
};

function* updatePricingVasItem({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(updatePricingVasItemRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updatePricingVasItemSuccess());
        createNotification({ type: 'success', message: 'pricing.update-data-success' });
        break;

      case EC_FAILURE:
        yield put(pricingError(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(pricingError(error));
  }
}

export function* watchCustomerPricingGetList() {
  yield takeEvery(PRICING_CUSTOMER_GET_LIST, getCustomerPricingListItems);
}
export function* watchSalemanPricingGetList() {
  yield takeEvery(PRICING_SALEMAN_GET_LIST, getSalemanPricingListItems);
}
export function* watchCarrierPricingGetList() {
  yield takeEvery(PRICING_CARRIER_GET_LIST, getCarrierPricingListItems);
}
export function* watchPricingGetList() {
  yield takeEvery(PRICING_GET_LIST, getPricingListItems);
}
export function* watchPricingAddMasterData() {
  yield takeEvery(PRICING_ADD_MASTER_DATA, addPricingMasterDataItem);
}
export function* watchPricingGetData() {
  yield takeEvery(PRICING_GET_DATA, getPricingDataItems);
}
export function* watchPricingUpdateData() {
  yield takeEvery(PRICING_UPDATE_DATA, updatePricingDataItem);
}
export function* watchPricingGetVas() {
  yield takeEvery(PRICING_GET_VAS, getPricingVasItems);
}
export function* watchPricingUpdateVas() {
  yield takeEvery(PRICING_UPDATE_VAS, updatePricingVasItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchCustomerPricingGetList),
    fork(watchSalemanPricingGetList),
    fork(watchCarrierPricingGetList),
    fork(watchPricingGetList),
    fork(watchPricingAddMasterData),
    fork(watchPricingGetData),
    fork(watchPricingUpdateData),
    fork(watchPricingGetVas),
    fork(watchPricingUpdateVas),
  ]);
}
