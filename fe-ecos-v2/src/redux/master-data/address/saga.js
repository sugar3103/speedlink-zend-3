import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';

import {
  ADDRESS_GET_LIST
} from "../../../constants/actionTypes";

import {
  getAddressListSuccess,
  getAddressListError
} from "./actions";

import { alertDanger } from '../../../redux/actions';

//list status

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/address`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getAddressListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getAddressListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getAddressListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getAddressListSuccess(response.result));
        break;

      case EC_FAILURE:
        yield put(getAddressListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        history.push('/login');
        yield put(alertDanger('Please login to countinue'))
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getAddressListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ADDRESS_GET_LIST, getAddressListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList)]);
}
