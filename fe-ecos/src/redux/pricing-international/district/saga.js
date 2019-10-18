import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_INT_ORIGIN_DISTRICT_GET_LIST, PRI_INT_DESTINATION_DISTRICT_GET_LIST, PRI_INT_PRICING_DISTRICT_GET_LIST } from "../../../constants/actionTypes";

import {
  districtInternationalError,
  getOriginDistrictInternationalListSuccess,
  getDestinationDistrictInternationalListSuccess,
  getPricingDistrictInternationalListSuccess,
} from "./actions";

/* GET LIST DISTRICT */

function getListDistrictInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/district`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

/* ORIGIN */
const getOriginDistrictInternationalListRequest = async (params) => {
  return await getListDistrictInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getOriginDistrictInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getOriginDistrictInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getOriginDistrictInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(districtInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(districtInternationalError(error));
  }
}

/* DESTINATION */
const getDestDistrictInternationalListRequest = async (params) => {
  return await getListDistrictInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationDistrictInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDestDistrictInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationDistrictInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(districtInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(districtInternationalError(error));
  }
}

/* PRICING */
const getPricingDistrictInternationalListRequest = async (params) => {
  return await getListDistrictInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getPricingDistrictInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingDistrictInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPricingDistrictInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(districtInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(districtInternationalError(error));
  }
}

export function* watchOriginDistrictInternationalGetList() {
  yield takeEvery(PRI_INT_ORIGIN_DISTRICT_GET_LIST, getOriginDistrictInternationalListItems);
}

export function* watchDestDistrictInternationalGetList() {
  yield takeEvery(PRI_INT_DESTINATION_DISTRICT_GET_LIST, getDestinationDistrictInternationalListItems);
}

export function* watchPricingDistrictInternationalGetList() {
  yield takeEvery(PRI_INT_PRICING_DISTRICT_GET_LIST, getPricingDistrictInternationalListItems);
}

export default function* rootSaga() {
  yield all([ 
    fork(watchOriginDistrictInternationalGetList),
    fork(watchDestDistrictInternationalGetList),
    fork(watchPricingDistrictInternationalGetList),
  ]);
}
