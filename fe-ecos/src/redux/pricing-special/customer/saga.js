import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_SPECIAL_CUSTOMER_GET_LIST } from "../../../constants/actionTypes";

import {
  customerSpecialError,
  getCustomerSpecialListSuccess,
} from "./actions";

/* GET LIST CUSTOMER SPECIAL */

function getListCustomerSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}customer`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCustomerSpecialListRequest = async (params) => {
  return await getListCustomerSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getCustomerSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCustomerSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCustomerSpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(customerSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(customerSpecialError(error));
  }
}

export function* watchCustomerSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_CUSTOMER_GET_LIST, getCustomerSpecialListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchCustomerSpecialGetList) ]);
}
