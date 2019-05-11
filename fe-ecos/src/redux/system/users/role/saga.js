import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../../constants/defaultValues';
import { authHeader } from '../../../../util/auth-header';
import history from '../../../../util/history';

import {
  ROLE_GET_LIST,
  ROLE_UPDATE_ITEM,
  ROLE_ADD_ITEM
} from "../../../../constants/actionTypes";

import {
  getRoleListSuccess,
  getRoleListError,
  updateRoleItemSuccess,
  addRoleItemSuccess,
  addRoleItemError,
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
  const { pathname } = history.location;
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
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
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

//Add Roles
function addRoleApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}roles/add`,
    headers: authHeader(),
    data: item
  });
}

const addRoleItemRequest = async item => {
  return await addRoleApi(item).then(res => res.data).catch(err => err)
};

function* addRoleItem ({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(addRoleItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addRoleItemSuccess());
        yield put(getRoleList());
        yield put(toggleRoleModal());
        createNotification({ type: 'success', message: 'role.add-success' });
        break;

      case EC_FAILURE:
        yield put(updateRoleItemError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(addRoleItemError(error));
  }
}

export function* watchAddItem() {
  yield takeEvery(ROLE_ADD_ITEM, addRoleItem);
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
  const { item } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(updateRoleItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateRoleItemSuccess());
        yield put(getRoleList());
        yield put(toggleRoleModal());
        createNotification({ type: 'success', message: 'role.update-success' });
        break;

      case EC_FAILURE:
        yield put(updateRoleItemError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
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
  yield all([fork(watchGetList),fork(watchUpdateItem), fork(watchAddItem)]);
}
