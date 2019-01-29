import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  BRANCH_GET_LIST,
  BRANCH_ADD_ITEM,
  BRANCH_UPDATE_ITEM,
  BRANCH_DELETE_ITEM 
} from "../../../constants/actionTypes";

import {
  toggleBranchModal,
  getBranchListSuccess,
  getBranchListError,
  addBranchItemSuccess,
  addBranchItemError,
  updateBranchItemSuccess,
  updateBranchItemError,
  deleteBranchItemSuccess,
  deleteBranchItemError,
  getBranchList,

} from "./actions";

import createNotification from '../../../util/notifications';

//list branch

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}branch`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getBranchListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getBranchListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getBranchListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getBranchListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getBranchListError(response.data));
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
    yield put(getBranchListError(error));
  }
}

//add branch

function addBranchApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}branch/add`,
    headers: authHeader(),
    data: item
  });
}

const addBranchItemRequest = async item => {
  return await addBranchApi(item).then(res => res.data).catch(err => err)
};

function* addBranchItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(addBranchItemRequest, item);
    console.log(response);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addBranchItemSuccess());
        yield put(getBranchList(null, messages));
        yield put(toggleBranchModal());
        createNotification({
          type: 'success', 
          message: messages['branch.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addBranchItemError(response.data));
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
    yield put(addBranchItemError(error));
  }
}

//update branch

function updateBranchApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}branch/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateBranchItemRequest = async item => {
  return await updateBranchApi(item).then(res => res.data).catch(err => err)
};

function* updateBranchItem({ payload }) {
  const { item, messages } = payload;
  try {
    const response = yield call(updateBranchItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateBranchItemSuccess());
        yield put(getBranchList(null, messages));
        yield put(toggleBranchModal());
        createNotification({
          type: 'success', 
          message: messages['branch.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateBranchItemError(response.data));
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
    yield put(updateBranchItemError(error));
  }
}

//delete branch

function deleteBranchApi(id) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}branch/delete`,
    headers: authHeader(),
    data: {  id: id }
  });
}

const deleteBranchItemRequest = async id => {
  return await deleteBranchApi(id).then(res => res.data).catch(err => err)
};

function* deleteBranchItem({ payload }) {
  const { id, messages } = payload;
  try {
    const response = yield call(deleteBranchItemRequest, id);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteBranchItemSuccess());
        yield put(getBranchList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['branch.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteBranchItemError(response.data));
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
    yield put(deleteBranchItemError(error));
  }
}


export function* watchGetList() {
  yield takeEvery(BRANCH_GET_LIST, getBranchListItems);
}

export function* watchAddItem() {
  yield takeEvery(BRANCH_ADD_ITEM, addBranchItem);
}

export function* watchUpdateItem() {
  yield takeEvery(BRANCH_UPDATE_ITEM, updateBranchItem);
}

export function* watchDeleteItem() {
  yield takeEvery(BRANCH_DELETE_ITEM, deleteBranchItem);
}




export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem)]);
}
