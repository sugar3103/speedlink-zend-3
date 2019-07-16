import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_INT_APPROVED_BY_GET_LIST } from "../../../constants/actionTypes";

import {
  approvedByInternationalError,
  getApprovedByInternationalListSuccess,
} from "./actions";

/* GET LIST APPROVED BY INTERNATIONAL */

function getListApprovedByInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}users`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getApprovedByInternationalListRequest = async (params) => {
  return await getListApprovedByInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getApprovedByInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getApprovedByInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getApprovedByInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(approvedByInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(approvedByInternationalError(error));
  }
}

export function* watchApprovedByInternationalGetList() {
  yield takeEvery(PRI_INT_APPROVED_BY_GET_LIST, getApprovedByInternationalListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchApprovedByInternationalGetList) ]);
}
