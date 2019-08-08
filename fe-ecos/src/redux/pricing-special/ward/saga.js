import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_SPECIAL_DESTINATION_WARD_GET_LIST, PRI_SPECIAL_DESTINATION_WARD_CREATE_GET_LIST } from "../../../constants/actionTypes";

import {
  wardSpecialError,
  getDestinationWardSpecialListSuccess,
  getDestinationWardCreateSpecialListSuccess
} from "./actions";

/* GET LIST WARD */

function getListWardSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/ward`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

/* DESTINATION */
const getDestWardSpecialListRequest = async (params) => {
  return await getListWardSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationWardSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDestWardSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationWardSpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(wardSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(wardSpecialError(error));
  }
}

/* DESTINATION CREATE */

function* getDestinationWardCreateSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDestWardSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationWardCreateSpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(wardSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(wardSpecialError(error));
  }
}

export function* watchDestWardSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_DESTINATION_WARD_GET_LIST, getDestinationWardSpecialListItems);
}

export function* watchDestWardCreateSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_DESTINATION_WARD_CREATE_GET_LIST, getDestinationWardCreateSpecialListItems);
}

export default function* rootSaga() {
  yield all([ 
    fork(watchDestWardSpecialGetList),
    fork(watchDestWardCreateSpecialGetList)
  ]);
}
