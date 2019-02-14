import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  BRANCHAREA_GET_LIST,
  BRANCHAREA_ADD_ITEM,
  BRANCHAREA_UPDATE_ITEM,
  BRANCHAREA_DELETE_ITEM 
} from "../../../constants/actionTypes";

import {
  toggleBranchAreaModal,
  getBranchAreaListSuccess,
  getBranchAreaListError,
  addBranchAreaItemSuccess,
  addBranchAreaItemError,
  updateBranchAreaItemSuccess,
  updateBranchAreaItemError,
  deleteBranchAreaItemSuccess,
  deleteBranchAreaItemError,
  getBranchAreaList,

} from "./actions";

import createNotification from '../../../util/notifications';

//list branch

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}brancharea`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getBranchAreaListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getBranchAreaListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getBranchAreaListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getBranchAreaListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getBranchAreaListError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
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
    yield put(getBranchAreaListError(error));
  }
}

//add branch

function addBranchAreaApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}brancharea/add`,
    headers: authHeader(),
    data: item
  });
}

const addBranchAreaItemRequest = async item => {
  return await addBranchAreaApi(item).then(res => res.data).catch(err => err)
};

function* addBranchAreaItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(addBranchAreaItemRequest, item);
    console.log(response);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addBranchAreaItemSuccess());
        yield put(getBranchAreaList(null, messages));
        yield put(toggleBranchAreaModal());
        createNotification({
          type: 'success', 
          message: messages['branchArea.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addBranchAreaItemError(response.data));
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
    yield put(addBranchAreaItemError(error));
  }
}

//update branch

function updateBranchAreaApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}brancharea/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateBranchAreaItemRequest = async item => {
  return await updateBranchAreaApi(item).then(res => res.data).catch(err => err)
};

function* updateBranchAreaItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(updateBranchAreaItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateBranchAreaItemSuccess());
        yield put(getBranchAreaList(null, messages));
        yield put(toggleBranchAreaModal());
        createNotification({
          type: 'success', 
          message: messages['brancharea.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateBranchAreaItemError(response.data));
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
    yield put(updateBranchAreaItemError(error));
  }
}

//delete branch

function deleteBranchApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}brancharea/delete`,
    headers: authHeader(),
    data: {  id: id }
  });
}

const deleteBranchAreaItemRequest = async id => {
  return await deleteBranchApi(id).then(res => res.data).catch(err => err)
};

function* deleteBranchAreaItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteBranchAreaItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteBranchAreaItemSuccess());
        yield put(getBranchAreaList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['branchArea.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteBranchAreaItemError(response.data));
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
    yield put(deleteBranchAreaItemError(error));
  }
}


export function* watchGetList() {
  yield takeEvery(BRANCHAREA_GET_LIST, getBranchAreaListItems);
}

export function* watchAddItem() {
  yield takeEvery(BRANCHAREA_ADD_ITEM, addBranchAreaItem);
}

export function* watchUpdateItem() {
  yield takeEvery(BRANCHAREA_UPDATE_ITEM, updateBranchAreaItem);
}

export function* watchDeleteItem() {
  yield takeEvery(BRANCHAREA_DELETE_ITEM, deleteBranchAreaItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem)]);
}
