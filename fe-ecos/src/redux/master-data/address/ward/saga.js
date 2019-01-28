import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  WARD_GET_LIST,
} from "../../../../constants/actionTypes";

import {
 
  getWardListSuccess,
  getWardListError,
} from "./actions";

import createNotification from '../../../../util/notifications';

//Ward Select
function getWardSelectListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/ward`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getWardSelectListRequest = async (params) => {
  return await getWardSelectListApi(params).then(res => res.data).catch(err => err)
};

function* getWardSelectListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getWardSelectListRequest, params);
console.log(response);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getWardListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getWardListError(response.message));
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
    yield put(getWardListError(error));
  }
}

export function* watchWardGetListSelect() {
  yield takeEvery(WARD_GET_LIST, getWardSelectListItems);
}


export default function* rootSaga() {
  yield all([fork(watchWardGetListSelect)]);
}
