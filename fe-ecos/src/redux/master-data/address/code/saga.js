import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  CODE_GET_LIST,
} from "../../../../constants/actionTypes";

import {
  getCodeListSuccess,
  getCodeListError,
} from "./actions";

import createNotification from '../../../../util/notifications';

//list code

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCodeListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getCodeListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCodeListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCodeListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getCodeListError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getCodeListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(CODE_GET_LIST, getCodeListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList)]);
}
