import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  CUSTOMER_GET_LIST
} from "../../../../constants/actionTypes";

import {
  getCustomerListSuccess,
  getCustomerListError
} from "./actions";

import createNotification from '../../../../util/notifications';

//list customer

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}customer`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCustomerListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getCustomerListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCustomerListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCustomerListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getCustomerListError(response.data));
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
    yield put(getCustomerListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(CUSTOMER_GET_LIST, getCustomerListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList)]);
}
