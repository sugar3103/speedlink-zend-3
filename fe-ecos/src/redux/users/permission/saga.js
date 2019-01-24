import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  PERMISSION_GET_LIST,
  PERMISSION_ADD_ITEM,
  PERMISSION_UPDATE_ITEM,
  PERMISSION_DELETE_ITEM 
} from "../../../constants/actionTypes";

import {
  togglePermissionModal,
  getPermissionListSuccess,
  getPermissionListError,
  addPermissionItemSuccess,
  addPermissionItemError,
  updatePermissionItemSuccess,
  updatePermissionItemError,
  deletePermissionItemSuccess,
  deletePermissionItemError,
  getPermissionList,
} from "./actions";

import createNotification from '../../../util/notifications';

//list permission

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}permission`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getPermissionListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getPermissionListItems({ payload }) {
  try {
    const response = yield call(getPermissionListRequest, payload);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getPermissionListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getPermissionListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authPermission');
        yield call(history.push, '/login');
        yield put(createNotification({type: 'warning', message: 'Please login to countinue'}));
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getPermissionListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(PERMISSION_GET_LIST, getPermissionListItems);
}

//Add
function addPermissionApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}permission/add`,
    headers: authHeader(),
    data: item
  });
}

const addPermissionItemRequest = async item => {
  return await addPermissionApi(item).then(res => res.data).catch(err => err)
};

function* addPermissionItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(addPermissionItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addPermissionItemSuccess());
        yield put(getPermissionList(null, messages));
        yield put(togglePermissionModal());
        createNotification({
          type: 'success', 
          message: messages['permission.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addPermissionItemError(response.data));
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
    yield put(addPermissionItemError(error));
  }
}
export function* watchAddItem() {
  yield takeEvery(PERMISSION_ADD_ITEM, addPermissionItem);
}

//Update
function updatePermissionApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}permission/edit`,
    headers: authHeader(),
    data: item
  });
}

const updatePermissionItemRequest = async item => {
  return await updatePermissionApi(item).then(res => res.data).catch(err => err)
};

function* updatePermissionItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(updatePermissionItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updatePermissionItemSuccess());
        yield put(getPermissionList(null, messages));
        yield put(togglePermissionModal());
        createNotification({
          type: 'success', 
          message: messages['permission.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updatePermissionItemError(response.data));
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
    yield put(updatePermissionItemError(error));
  }
}

export function* watchUpdateItem() {
  yield takeEvery(PERMISSION_UPDATE_ITEM, updatePermissionItem);
}



//Delete
function deletePermissionApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}permission/delete`,
    headers: authHeader(),
    data: {  id: id }
  });
}

const deletePermissionItemRequest = async id => {
  return await deletePermissionApi(id).then(res => res.data).catch(err => err)
};

function* deletePermissionItem({ payload }) {
  const { id, messages } = payload;
  
  try {
    const response = yield call(deletePermissionItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deletePermissionItemSuccess());
        yield put(getPermissionList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['permission.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deletePermissionItemError(response.data));
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
    yield put(deletePermissionItemError(error));
  }
}

export function* watchDeleteItem() {
  yield takeEvery(PERMISSION_DELETE_ITEM, deletePermissionItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchAddItem),
    fork(watchUpdateItem),
    fork(watchDeleteItem)
  ]);
}
