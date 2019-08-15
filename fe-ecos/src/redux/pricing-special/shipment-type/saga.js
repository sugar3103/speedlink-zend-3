import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';
import { PRI_SPECIAL_SHIPMENT_TYPE_GET_LIST } from "../../../constants/actionTypes";

import {
  shipmentTypeSpecialError,
  getShipmentTypeSpecialListSuccess,
} from "./actions";

/* GET LIST SHIPMENT_TYPE SPECIAL */

function getListShipmentTypeSpecialApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type`,
    headers: authHeader(),
    data: JSON.stringify(params),
    dataType: 'jsonp'
  });
}

const getShipmentTypeSpecialListRequest = async (params) => {
  return await getListShipmentTypeSpecialApi(params).then(res => res.data).catch(err => err)
};

function* getShipmentTypeSpecialListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getShipmentTypeSpecialListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getShipmentTypeSpecialListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(shipmentTypeSpecialError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(shipmentTypeSpecialError(error));
  }
}

export function* watchShipmentTypeSpecialGetList() {
  yield takeEvery(PRI_SPECIAL_SHIPMENT_TYPE_GET_LIST, getShipmentTypeSpecialListItems);
}

export default function* rootSaga() {
  yield all([ fork(watchShipmentTypeSpecialGetList) ]);
}
