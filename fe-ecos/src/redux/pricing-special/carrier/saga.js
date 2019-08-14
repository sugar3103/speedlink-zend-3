import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_SPECIAL_CARRIER_GET_LIST } from "../../../constants/actionTypes";

import {
  carrierSpecialError,
  getCarrierSpecialListSuccess,
} from "./actions";

/* GET LIST CARRIER SPECIAL */

function getListCarrierSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}carrier`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCarrierSpecialListRequest = async (params) => {
  return await getListCarrierSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getCarrierSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCarrierSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCarrierSpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(carrierSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(carrierSpecialError(error));
  }
}

export function* watchCarrierSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_CARRIER_GET_LIST, getCarrierSpecialListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchCarrierSpecialGetList) ]);
}
