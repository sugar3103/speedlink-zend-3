import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';

import {
  HUB_GET_LIST, 
  HUB_ADD_ITEM, 
  HUB_UPDATE_ITEM, 
  HUB_DELETE_ITEM,
  HUB_GET_LIST_SELECT 
} from "../../../constants/actionTypes";

import {
  toggleHubModal,
  getHubListSuccess,
  getHubListError,
  addHubItemSuccess,
  addHubItemError,
  updateHubItemSuccess,
  updateHubItemError,
  deleteHubItemSuccess,
  deleteHubItemError,
  getHubList,
  getHubListSelectSuccess,
  getHubListSelectError
} from "./actions";

import { alertDanger, alertSuccess } from '../../../redux/actions';

//list hub

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/hub`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getHubListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getHubListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getHubListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getHubListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getHubListError(response.message));
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
    yield put(getHubListError(error));
  }
}

//Hub Select
function getHubSelectListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/hub/list`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getHubSelectListRequest = async (params) => {
  return await getHubSelectListApi(params).then(res => res.data).catch(err => err)
};

function* getHubSelectListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getHubSelectListRequest, params);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getHubListSelectSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getHubListSelectError(response.message));
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
    yield put(getHubListSelectError(error));
  }
}

//add Hub

function addHubApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/hub/add`,
    headers: authHeader(),
    data: item
  });
}

const addHubItemRequest = async item => {
  return await addHubApi(item).then(res => res.data).catch(err => err)
};

function* addHubItem({ payload }) {
  const { item, history } = payload;
  try {
    const response = yield call(addHubItemRequest, item);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addHubItemSuccess(response.result));
        yield put(getHubList(history));
        yield put(toggleHubModal());
        yield put(alertSuccess(response.result.message));
        break;

      case EC_FAILURE:
        yield put(addHubItemError(response.message));
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
    yield put(addHubItemError(error));
  }
}

//update Hub

function updateHubApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/hub/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateHubItemRequest = async item => {
  return await updateHubApi(item).then(res => res.data).catch(err => err)
};

function* updateHubItem({ payload }) {
  const { item, history } = payload;
  try {
    const response = yield call(updateHubItemRequest, item);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateHubItemSuccess(response.result));
        yield put(getHubList(history));
        yield put(toggleHubModal());
        yield put(alertSuccess(response.message));
        break;

      case EC_FAILURE:
        yield put(updateHubItemError(response.message));
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
    yield put(updateHubItemError(error));
  }
}

//delete Hub

function deleteHubApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/hub/delete`,
    headers: authHeader(),
    data: item
  });
}

const deleteHubItemRequest = async item => {
  return await deleteHubApi(item).then(res => res.data).catch(err => err)
};

function* deleteHubItem({ payload }) {
  const { item, history } = payload;
  try {

    const response = yield call(deleteHubItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteHubItemSuccess(response.result));
        yield put(getHubList(history));
        yield put(alertSuccess(response.message));
        break;

      case EC_FAILURE:
        yield put(deleteHubItemError(response.message));
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
    yield put(deleteHubItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(HUB_GET_LIST, getHubListItems);
}

export function* wathcAddItem() {
  yield takeEvery(HUB_ADD_ITEM, addHubItem);
}

export function* wathcUpdateItem() {
  yield takeEvery(HUB_UPDATE_ITEM, updateHubItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(HUB_DELETE_ITEM, deleteHubItem);
}

export function* watchHubGetListSelect() {
  yield takeEvery(HUB_GET_LIST_SELECT, getHubSelectListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcUpdateItem), fork(wathcDeleteItem), fork(watchHubGetListSelect)]);
}
