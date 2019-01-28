import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  DISTRICT_GET_LIST,
} from "../../../../constants/actionTypes";

import {
 
  getDistrictListSuccess,
  getDistrictListError,
} from "./actions";

import createNotification from '../../../../util/notifications';

//District Select
function getDistrictSelectListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/district`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDistrictSelectListRequest = async (params) => {
  return await getDistrictSelectListApi(params).then(res => res.data).catch(err => err)
};

function* getDistrictSelectListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getDistrictSelectListRequest, params);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDistrictListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getDistrictListError(response.message));
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
    yield put(getDistrictListError(error));
  }
}

export function* watchDistrictGetListSelect() {
  yield takeEvery(DISTRICT_GET_LIST, getDistrictSelectListItems);
}


export default function* rootSaga() {
  yield all([fork(watchDistrictGetListSelect)]);
}
