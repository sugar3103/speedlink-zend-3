import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_INT_SALEMAN_GET_LIST } from "../../../constants/actionTypes";

import {
  salemanInternationalError,
  getSalemanInternationalListSuccess,
} from "./actions";

/* GET LIST SALEMAN INTERNATIONAL */

function getListSalemanInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}users`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getSalemanInternationalListRequest = async (params) => {
  return await getListSalemanInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getSalemanInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getSalemanInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getSalemanInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(salemanInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(salemanInternationalError(error));
  }
}

export function* watchSalemanInternationalGetList() {
  yield takeEvery(PRI_INT_SALEMAN_GET_LIST, getSalemanInternationalListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchSalemanInternationalGetList) ]);
}
