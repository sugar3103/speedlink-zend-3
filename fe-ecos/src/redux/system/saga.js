import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS} from '../../constants/defaultValues';
import { authHeader } from '../../util/auth-header';
import history from '../../util/history';

import {
  SYSTEM_INFO
} from "../../constants/actionTypes";

import {
  getSystemInfoSuccess
} from "./action";

//Info
function getSystemInfoApi() {
  return axios.request({
    method: 'post',
    url: `${apiUrl}system/info`
  });
}

const getSystemInfoRequest = async () => {
  return await getSystemInfoApi().then(res => res.data).catch(err => err)
};

function* getSystemInfoItems({ payload }) {  
  try {
    const response = yield call(getSystemInfoRequest);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getSystemInfoSuccess(response.data));
        break;
      default:
        break;
    }
    
  } catch (error) {
    console.log('System Info Error: '+ error)
  }
}

export function* watchGetSystemInfo() {
  yield takeEvery(SYSTEM_INFO, getSystemInfoItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetSystemInfo)]);
}


