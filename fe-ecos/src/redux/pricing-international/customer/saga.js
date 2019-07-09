import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_INT_CUSTOMER_GET_LIST } from "../../../constants/actionTypes";

import {
  customerInternationalError,
  getCustomerInternationalListSuccess,
} from "./actions";

/* GET LIST CUSTOMER INTERNATIONAL */

function getListCustomerInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}customer`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCustomerInternationalListRequest = async (params) => {
  return await getListCustomerInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getCustomerInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCustomerInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCustomerInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(customerInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(customerInternationalError(error));
  }
}

export function* watchCustomerInternationalGetList() {
  yield takeEvery(PRI_INT_CUSTOMER_GET_LIST, getCustomerInternationalListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchCustomerInternationalGetList) ]);
}
