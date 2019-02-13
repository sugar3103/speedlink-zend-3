import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  GET_SETTING,
  UPDATE_SETTING
} from "../../../constants/actionTypes";

import {
  getSettingSuccess,
  getSettingError,  
  getSetting
} from "./action";
import { startSubmit, stopSubmit } from 'redux-form';


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
  yield takeEvery(GET_SETTING, getSettingItems);
}


//Update Setting

function updateApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}setting/update`,
    headers: authHeader(),
    data: JSON.stringify(params)
  })
}

const updateSettingRequest = async (params) => {
  return await updateApi(params).then(res => res.data).catch(err => err)
};

function* updateSetting({ payload}) {
  const { item, messages } = payload;
  yield put(startSubmit('setting_action_form'));
  try {
    const response = yield call(updateSettingRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getSetting(null, messages));
        createNotification({
          type: 'success', 
          message: messages['setting.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(getSettingError(response.data));
        // yield put(validateCity(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
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

export function* watchUpdate() {
  yield takeEvery(UPDATE_SETTING, updateSetting);
}
export default function* rootSaga() {
  yield all([fork(watchGet), fork(watchUpdate)]);
}
