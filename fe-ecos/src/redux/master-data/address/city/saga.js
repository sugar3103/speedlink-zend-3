import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  CITY_GET_LIST,
} from "../../../../constants/actionTypes";

import {
 
  getCityListSuccess,
  getCityListError,
} from "./actions";

import createNotification from '../../../../util/notifications';

//City Select
function getCitySelectListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCitySelectListRequest = async (params) => {
  return await getCitySelectListApi(params).then(res => res.data).catch(err => err)
};

function* getCitySelectListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getCitySelectListRequest, params);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCityListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getCityListError(response.message));
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
    yield put(getCityListError(error));
  }
}

export function* watchCityGetListSelect() {
  yield takeEvery(CITY_GET_LIST, getCitySelectListItems);
}


export default function* rootSaga() {
  yield all([fork(watchCityGetListSelect)]);
}
