import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../constants/defaultValues';
import { authHeader } from '../../util/auth-header';
import history from '../../util/history';

import {
  USER_GET_LIST,
} from "../../constants/actionTypes";

import {
  getUserListSuccess,
  getUserListError,
} from "./actions";

import createNotification from '../../util/notifications';

//list status

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}user`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getUserListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getUserListItems({ payload }) {
  try {
    const response = yield call(getUserListRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getUserListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getUserListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login');
        yield put(createNotification({type: 'warning', message: 'Please login to countinue'}));
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getUserListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(USER_GET_LIST, getUserListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList)]);
}
