import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_DOM_APPROVED_BY_GET_LIST } from "../../../constants/actionTypes";

import {
  approvedByDomesticError,
  getApprovedByDomesticListSuccess,
} from "./actions";

/* GET LIST APPROVED BY DOMESTIC */

function getListApprovedByDomesticApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}users`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getApprovedByDomesticListRequest = async (params) => {
  return await getListApprovedByDomesticApi(params).then(res => res.data).catch(err => err)
};

function* getApprovedByDomesticListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getApprovedByDomesticListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getApprovedByDomesticListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(approvedByDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(approvedByDomesticError(error));
  }
}

export function* watchApprovedByDomesticGetList() {
  yield takeEvery(PRI_DOM_APPROVED_BY_GET_LIST, getApprovedByDomesticListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchApprovedByDomesticGetList) ]);
}
