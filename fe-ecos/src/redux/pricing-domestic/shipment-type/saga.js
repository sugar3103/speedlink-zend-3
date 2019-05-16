import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_DOM_SHIPMENT_TYPE_GET_LIST } from "../../../constants/actionTypes";

import {
  shipmentTypeDomesticError,
  getShipmentTypeDomesticListSuccess,
} from "./actions";

/* GET LIST SHIPMENT_TYPE DOMESTIC */

function getListZoneDomesticApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getZoneDomesticListRequest = async (params) => {
  return await getListZoneDomesticApi(params).then(res => res.data).catch(err => err)
};

function* getZoneDomesticListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getZoneDomesticListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getShipmentTypeDomesticListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(shipmentTypeDomesticError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(shipmentTypeDomesticError(error));
  }
}

export function* watchZoneDomesticGetList() {
  yield takeEvery(PRI_DOM_SHIPMENT_TYPE_GET_LIST, getZoneDomesticListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchZoneDomesticGetList) ]);
}
