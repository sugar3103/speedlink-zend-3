import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  SETTING_GET,
} from "../../../constants/actionTypes";

import {
  getSettingSuccess,
  getSettingError,
} from "./action";

import createNotification from '../../../util/notifications';

//list code

function getApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}setting`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getSettingRequest = async (params) => {
  return await getApi(params).then(res => res.data).catch(err => err)
};

function* getSettingItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getSettingRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getSettingSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getSettingError(response.data));
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
    yield put(getSettingError(error));
  }
}

export function* watchGet() {
  yield takeEvery(SETTING_GET, getSettingItems);
}

export default function* rootSaga() {
  yield all([fork(watchGet)]);
}
