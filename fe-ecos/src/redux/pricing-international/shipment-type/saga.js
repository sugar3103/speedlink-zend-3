import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_INT_SHIPMENT_TYPE_GET_LIST } from "../../../constants/actionTypes";

import {
  shipmentTypeInternationalError,
  getShipmentTypeInternationalListSuccess,
} from "./actions";

/* GET LIST SHIPMENT_TYPE DOMESTIC */

function getListShipmentTypeInternationalApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type`,
    headers: authHeader(),
    data: JSON.stringify(params),
    dataType: 'jsonp'
  });
}

const getShipmentTypeInternationalListRequest = async (params) => {
  return await getListShipmentTypeInternationalApi(params).then(res => res.data).catch(err => err)
};

function* getShipmentTypeInternationalListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getShipmentTypeInternationalListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getShipmentTypeInternationalListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(shipmentTypeInternationalError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(shipmentTypeInternationalError(error));
  }
}

export function* watchShipmentTypeInternationalGetList() {
  yield takeEvery(PRI_INT_SHIPMENT_TYPE_GET_LIST, getShipmentTypeInternationalListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchShipmentTypeInternationalGetList) ]);
}
