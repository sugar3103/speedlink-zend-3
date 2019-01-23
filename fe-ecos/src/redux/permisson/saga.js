import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../constants/defaultValues';
import { authHeader } from '../../util/auth-header';
import history from '../../util/history';

import {
  PERMISSON_GET_LIST,
} from "../../constants/actionTypes";

import {
  getPermissonListSuccess,
  getPermissonListError,
} from "./actions";

import createNotification from '../../util/notifications';

//list status

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}permission`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPermissonListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getPermissonListItems({ payload }) {
  try {
    const response = yield call(getPermissonListRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPermissonListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getPermissonListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authPermisson');
        yield call(history.push, '/login');
        yield put(createNotification({type: 'warning', message: 'Please login to countinue'}));
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getPermissonListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(PERMISSON_GET_LIST, getPermissonListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList)]);
}
