import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_INT_SERVICE_GET_LIST } from "../../../constants/actionTypes";

import {
  serviceInternationalError,
  getServiceInternationalListSuccess,
} from "./actions";

/* GET LIST SERVICE INTERNATIONAL */

function getListServiceInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}service`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getServiceInternationalListRequest = async (params) => {
  return await getListServiceInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getServiceInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getServiceInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getServiceInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(serviceInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(serviceInternationalError(error));
  }
}

export function* watchServiceInternationalGetList() {
  yield takeEvery(PRI_INT_SERVICE_GET_LIST, getServiceInternationalListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchServiceInternationalGetList) ]);
}
