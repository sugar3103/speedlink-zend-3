import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_SPECIAL_SALEMAN_GET_LIST } from "../../../constants/actionTypes";

import {
  salemanSpecialError,
  getSalemanSpecialListSuccess,
} from "./actions";

/* GET LIST SALEMAN SPECIAL */

function getListSalemanSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}users`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getSalemanSpecialListRequest = async (params) => {
  return await getListSalemanSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getSalemanSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getSalemanSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getSalemanSpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(salemanSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(salemanSpecialError(error));
  }
}

export function* watchSalemanSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_SALEMAN_GET_LIST, getSalemanSpecialListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchSalemanSpecialGetList) ]);
}
