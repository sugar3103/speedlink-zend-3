import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_SPECIAL_APPROVED_BY_GET_LIST } from "../../../constants/actionTypes";

import {
  approvedBySpecialError,
  getApprovedBySpecialListSuccess,
} from "./actions";

/* GET LIST APPROVED BY SPECIAL */

function getListApprovedBySpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}users`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getApprovedBySpecialListRequest = async (params) => {
  return await getListApprovedBySpecialApi(params).then(res => res.data).catch(err => err)
};

function* getApprovedBySpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getApprovedBySpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getApprovedBySpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(approvedBySpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(approvedBySpecialError(error));
  }
}

export function* watchApprovedBySpecialGetList() {
  yield takeEvery(PRI_SPECIAL_APPROVED_BY_GET_LIST, getApprovedBySpecialListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchApprovedBySpecialGetList) ]);
}
