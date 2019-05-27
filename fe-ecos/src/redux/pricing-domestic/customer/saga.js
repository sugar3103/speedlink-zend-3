import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_DOM_CUSTOMER_GET_LIST } from "../../../constants/actionTypes";

import {
  customerDomesticError,
  getCustomerDomesticListSuccess,
} from "./actions";

/* GET LIST CUSTOMER DOMESTIC */

function getListCustomerDomesticApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}customer`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCustomerDomesticListRequest = async (params) => {
  return await getListCustomerDomesticApi(params).then(res => res.data).catch(err => err)
};

function* getCustomerDomesticListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCustomerDomesticListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCustomerDomesticListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(customerDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(customerDomesticError(error));
  }
}

export function* watchCustomerDomesticGetList() {
  yield takeEvery(PRI_DOM_CUSTOMER_GET_LIST, getCustomerDomesticListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchCustomerDomesticGetList) ]);
}
