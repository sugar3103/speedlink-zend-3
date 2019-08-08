import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_SPECIAL_ORIGIN_CITY_GET_LIST, PRI_SPECIAL_DESTINATION_CITY_GET_LIST } from "../../../constants/actionTypes";

import {
  citySpecialError,
  getOriginCitySpecialListSuccess,
  getDestinationCitySpecialListSuccess
} from "./actions";

/* GET LIST CITY */

function getListCitySpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

/* ORIGIN */
const getOriginCitySpecialListRequest = async (params) => {
  return await getListCitySpecialApi(params).then(res => res.data).catch(err => err)
};

function* getOriginCitySpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getOriginCitySpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getOriginCitySpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(citySpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(citySpecialError(error));
  }
}

/* DESTINATION */
const getDestCitySpecialListRequest = async (params) => {
  return await getListCitySpecialApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationCitySpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDestCitySpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationCitySpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(citySpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(citySpecialError(error));
  }
}

export function* watchOriginCitySpecialGetList() {
  yield takeEvery(PRI_SPECIAL_ORIGIN_CITY_GET_LIST, getOriginCitySpecialListItems);
}

export function* watchDestCitySpecialGetList() {
  yield takeEvery(PRI_SPECIAL_DESTINATION_CITY_GET_LIST, getDestinationCitySpecialListItems);
}

export default function* rootSaga() {
  yield all([ 
    fork(watchOriginCitySpecialGetList),
    fork(watchDestCitySpecialGetList)
  ]);
}
