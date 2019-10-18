import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_SPECIAL_DESTINATION_DISTRICT_GET_LIST, PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_GET_LIST } from "../../../constants/actionTypes";

import {
  districtSpecialError,
  getDestinationDistrictSpecialListSuccess,
  getDestinationDistrictCreateSpecialListSuccess
} from "./actions";

/* GET LIST DISTRICT */

function getListDistrictSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/district`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

/* DESTINATION */
const getDestDistrictSpecialListRequest = async (params) => {
  return await getListDistrictSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationDistrictSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDestDistrictSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationDistrictSpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(districtSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(districtSpecialError(error));
  }
}

/* DESTINATION CREATE */

function* getDestinationDistrictCreateSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getDestDistrictSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationDistrictCreateSpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(districtSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(districtSpecialError(error));
  }
}

export function* watchDestDistrictSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_DESTINATION_DISTRICT_GET_LIST, getDestinationDistrictSpecialListItems);
}

export function* watchDestDistrictCreateSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_GET_LIST, getDestinationDistrictCreateSpecialListItems);
}

export default function* rootSaga() {
  yield all([ 
    fork(watchDestDistrictSpecialGetList),
    fork(watchDestDistrictCreateSpecialGetList)
  ]);
}
