import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../constants/defaultValues';
import { authHeader } from '../../util/auth-header';
import history from '../../util/history';

import {
  USER_GET_LIST,
  USER_UPDATE_ITEM,  
} from "../../constants/actionTypes";

import {
  getUserListSuccess,
  getUserListError,
  updateUserItemSuccess,
  updateUserItemError,
  getUserList,
  toggleUserModal
} from "./actions";

import createNotification from '../../util/notifications';

//list user

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}user`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getUserListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getUserListItems({ payload }) {
  try {
    const response = yield call(getUserListRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getUserListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getUserListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login');
        yield put(createNotification({type: 'warning', message: 'Please login to countinue'}));
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getUserListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(USER_GET_LIST, getUserListItems);
}


//update user

function updateUserApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}user/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateUserItemRequest = async item => {
  return await updateUserApi(item).then(res => res.data).catch(err => err)
};

function* updateUserItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(updateUserItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateUserItemSuccess());
        yield put(getUserList(null, messages));
        yield put(toggleUserModal());
        createNotification({
          type: 'success', 
          message: messages['user.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateUserItemError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('user');
        yield call(history.push, '/login');
        createNotification({
          type: 'warning', 
          message: messages['login.login-again'],
          title: messages['notification.warning']
        });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(updateUserItemError(error));
  }
}
export function* wathcUpdateItem() {
  yield takeEvery(USER_UPDATE_ITEM, updateUserItem);
}
export default function* rootSaga() {
  yield all([fork(watchGetList),fork(wathcUpdateItem)]);
}
