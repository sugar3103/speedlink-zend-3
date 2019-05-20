import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_DOM_SALEMAN_GET_LIST } from "../../../constants/actionTypes";

import {
  salemanDomesticError,
  getSalemanDomesticListSuccess,
} from "./actions";

/* GET LIST SALEMAN DOMESTIC */

function getListSalemanDomesticApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}users`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getSalemanDomesticListRequest = async (params) => {
  return await getListSalemanDomesticApi(params).then(res => res.data).catch(err => err)
};

function* getSalemanDomesticListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getSalemanDomesticListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getSalemanDomesticListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(salemanDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(salemanDomesticError(error));
  }
}

export function* watchSalemanDomesticGetList() {
  yield takeEvery(PRI_DOM_SALEMAN_GET_LIST, getSalemanDomesticListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchSalemanDomesticGetList) ]);
}
