import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_SPECIAL_SERVICE_GET_LIST } from "../../../constants/actionTypes";

import {
  serviceSpecialError,
  getServiceSpecialListSuccess,
} from "./actions";

/* GET LIST SERVICE SPECIAL */

function getListServiceSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}service`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getServiceSpecialListRequest = async (params) => {
  return await getListServiceSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getServiceSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getServiceSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getServiceSpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(serviceSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(serviceSpecialError(error));
  }
}

export function* watchServiceSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_SERVICE_GET_LIST, getServiceSpecialListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchServiceSpecialGetList) ]);
}
