import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_INT_ORIGIN_WARD_GET_LIST, PRI_INT_DESTINATION_WARD_GET_LIST } from "../../../constants/actionTypes";

import {
  wardInternationalError,
  getOriginWardInternationalListSuccess,
  getDestinationWardInternationalListSuccess
} from "./actions";

/* GET LIST WARD */

function getListWardInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/ward`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

/* ORIGIN */
const getOriginWardInternationalListRequest = async (params) => {
  return await getListWardInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getOriginWardInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getOriginWardInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getOriginWardInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(wardInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(wardInternationalError(error));
  }
}

/* DESTINATION */
const getDestWardInternationalListRequest = async (params) => {
  return await getListWardInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationWardInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDestWardInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationWardInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(wardInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(wardInternationalError(error));
  }
}

export function* watchOriginWardInternationalGetList() {
  yield takeEvery(PRI_INT_ORIGIN_WARD_GET_LIST, getOriginWardInternationalListItems);
}

export function* watchDestWardInternationalGetList() {
  yield takeEvery(PRI_INT_DESTINATION_WARD_GET_LIST, getDestinationWardInternationalListItems);
}

export default function* rootSaga() {
  yield all([ 
    fork(watchOriginWardInternationalGetList),
    fork(watchDestWardInternationalGetList),
  ]);
}
