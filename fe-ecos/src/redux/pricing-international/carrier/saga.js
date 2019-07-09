import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_INT_CARRIER_GET_LIST } from "../../../constants/actionTypes";

import {
  carrierInternationalError,
  getCarrierInternationalListSuccess,
} from "./actions";

/* GET LIST CARRIER INTERNATIONAL */

function getListCarrierInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}carrier`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCarrierInternationalListRequest = async (params) => {
  return await getListCarrierInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getCarrierInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCarrierInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCarrierInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(carrierInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(carrierInternationalError(error));
  }
}

export function* watchCarrierInternationalGetList() {
  yield takeEvery(PRI_INT_CARRIER_GET_LIST, getCarrierInternationalListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchCarrierInternationalGetList) ]);
}
