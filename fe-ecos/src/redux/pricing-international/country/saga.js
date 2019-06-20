import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_INT_ORIGIN_COUNTRY_GET_LIST, PRI_INT_DESTINATION_COUNTRY_GET_LIST } from "../../../constants/actionTypes";

import {
  countryInternationalError,
  getOriginCountryInternationalListSuccess,
  getDestinationCountryInternationalListSuccess
} from "./actions";

/* GET LIST COUNTRY */

function getListCountryInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/country`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

/* ORIGIN */
const getOriginCountryInternationalListRequest = async (params) => {
  return await getListCountryInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getOriginCountryInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getOriginCountryInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getOriginCountryInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(countryInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(countryInternationalError(error));
  }
}

/* DESTINATION */
const getDestCountryInternationalListRequest = async (params) => {
  return await getListCountryInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationCountryInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDestCountryInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationCountryInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(countryInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(countryInternationalError(error));
  }
}

export function* watchOriginCountryInternationalGetList() {
  yield takeEvery(PRI_INT_ORIGIN_COUNTRY_GET_LIST, getOriginCountryInternationalListItems);
}

export function* watchDestCountryInternationalGetList() {
  yield takeEvery(PRI_INT_DESTINATION_COUNTRY_GET_LIST, getDestinationCountryInternationalListItems);
}

export default function* rootSaga() {
  yield all([ 
    fork(watchOriginCountryInternationalGetList),
    fork(watchDestCountryInternationalGetList),
  ]);
}
