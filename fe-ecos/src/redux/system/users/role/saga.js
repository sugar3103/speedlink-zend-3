import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  ROLE_GET_LIST,
  ROLE_UPDATE_ITEM
} from "../../../../constants/actionTypes";

import {
  getRoleListSuccess,
  getRoleListError,
  updateRoleItemSuccess,
  getRoleList,
  toggleRoleModal,
  updateRoleItemError
} from "./actions";

import createNotification from '../../../../util/notifications';

//list status

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}roles`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getRoleListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getRoleListItem ({ payload }) {
  try {
    const response = yield call(getRoleListRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getRoleListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getRoleListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authRole');
        yield call(history.push, '/login');
        yield put(createNotification({type: 'warning', message: 'Please login to countinue'}));
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getRoleListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ROLE_GET_LIST, getRoleListItem);
}


//Edit Roles
function updateRoleApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}roles/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateRoleItemRequest = async item => {
  return await updateRoleApi(item).then(res => res.data).catch(err => err)
};

function* updateRoleItem ({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(updateRoleItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateRoleItemSuccess());
        yield put(getRoleList(null, messages));
        yield put(toggleRoleModal());
        createNotification({
          type: 'success', 
          message: messages['role.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateRoleItemError(response.data));
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
    yield put(updateRoleItemError(error));
  }
}

export function* watchUpdateItem() {
  yield takeEvery(ROLE_UPDATE_ITEM, updateRoleItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList),fork(watchUpdateItem)]);
}
