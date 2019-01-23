import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../constants/defaultValues';
import { authHeader } from '../../util/auth-header';
import history from '../../util/history';

import {
  ROLE_GET_LIST,
} from "../../constants/actionTypes";

import {
  getRoleListSuccess,
  getRoleListError,
} from "./actions";

import createNotification from '../../util/notifications';

//list status

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}roles`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getRoleListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getRoleListItems({ payload }) {
  try {
    const response = yield call(getRoleListRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getRoleListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getRoleListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authRole');
        yield call(history.push, '/login');
        yield put(createNotification({type: 'warning', message: 'Please login to countinue'}));
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getRoleListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ROLE_GET_LIST, getRoleListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList)]);
}
