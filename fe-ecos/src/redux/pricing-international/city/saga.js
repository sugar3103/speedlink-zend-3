import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_INT_ORIGIN_CITY_GET_LIST, PRI_INT_DESTINATION_CITY_GET_LIST, PRI_INT_PRICING_CITY_GET_LIST } from "../../../constants/actionTypes";

import {
  cityInternationalError,
  getOriginCityInternationalListSuccess,
  getDestinationCityInternationalListSuccess,
  getPricingCityInternationalListSuccess
} from "./actions";

/* GET LIST CITY */

function getListCityInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

/* ORIGIN */
const getOriginCityInternationalListRequest = async (params) => {
  return await getListCityInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getOriginCityInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getOriginCityInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getOriginCityInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(cityInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(cityInternationalError(error));
  }
}

/* DESTINATION */
const getDestCityInternationalListRequest = async (params) => {
  return await getListCityInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationCityInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDestCityInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationCityInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(cityInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(cityInternationalError(error));
  }
}

/* PRICING */
const getPricingCityInternationalListRequest = async (params) => {
  return await getListCityInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getPricingCityInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getPricingCityInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPricingCityInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(cityInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(cityInternationalError(error));
  }
}

export function* watchOriginCityInternationalGetList() {
  yield takeEvery(PRI_INT_ORIGIN_CITY_GET_LIST, getOriginCityInternationalListItems);
}

export function* watchDestCityInternationalGetList() {
  yield takeEvery(PRI_INT_DESTINATION_CITY_GET_LIST, getDestinationCityInternationalListItems);
}

export function* watchPricingCityInternationalGetList() {
  yield takeEvery(PRI_INT_PRICING_CITY_GET_LIST, getPricingCityInternationalListItems);
}

export default function* rootSaga() {
  yield all([ 
    fork(watchOriginCityInternationalGetList),
    fork(watchDestCityInternationalGetList),
    fork(watchPricingCityInternationalGetList),
  ]);
}
