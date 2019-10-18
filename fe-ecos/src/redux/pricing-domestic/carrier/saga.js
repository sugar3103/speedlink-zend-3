import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_DOM_CARRIER_GET_LIST } from "../../../constants/actionTypes";

import {
  carrierDomesticError,
  getCarrierDomesticListSuccess,
} from "./actions";

/* GET LIST CARRIER DOMESTIC */

function getListCarrierDomesticApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}carrier`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCarrierDomesticListRequest = async (params) => {
  return await getListCarrierDomesticApi(params).then(res => res.data).catch(err => err)
};

function* getCarrierDomesticListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCarrierDomesticListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCarrierDomesticListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(carrierDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(carrierDomesticError(error));
  }
}

export function* watchCarrierDomesticGetList() {
  yield takeEvery(PRI_DOM_CARRIER_GET_LIST, getCarrierDomesticListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchCarrierDomesticGetList) ]);
}
