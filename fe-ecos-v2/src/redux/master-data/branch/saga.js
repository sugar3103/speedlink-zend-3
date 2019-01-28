import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';

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

import { alertDanger, alertSuccess } from '../../../redux/actions';

//list hub

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/branch`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getBranchListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getBranchListItems({ payload }) {
  const { params, history } = payload;
  try {
    const response = yield call(getBranchListRequest, params);
// console.log(response);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getBranchListSuccess(response.data));
        break;

      case EC_FAILURE:
        yield put(getBranchListError(response.message));
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
    yield put(getBranchListError(error));
  }
}

//add Branch

function addBranchApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/branch/add`,
    headers: authHeader(),
    data: item
  });
}

const addBranchItemRequest = async item => {
  return await addBranchApi(item).then(res => res.data).catch(err => err)
};

function* addBranchItem({ payload }) {
  const { item, history } = payload;
  try {
    const response = yield call(addBranchItemRequest, item);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addBranchItemSuccess(response.result));
        yield put(getBranchList(history));
        yield put(toggleBranchModal());
        yield put(alertSuccess(response.result.message));
        break;

      case EC_FAILURE:
        yield put(addBranchItemError(response.message));
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
    yield put(addBranchItemError(error));
  }
}

//update Branch

function updateBranchApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/branch/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateBranchItemRequest = async item => {
  return await updateBranchApi(item).then(res => res.data).catch(err => err)
};

function* updateBranchItem({ payload }) {
  const { item, history } = payload;
  try {
    const response = yield call(updateBranchItemRequest, item);
        // console.log(response);

    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateBranchItemSuccess(response.result));
        yield put(getBranchList(history));
        yield put(toggleBranchModal());
        yield put(alertSuccess(response.message));
        break;

      case EC_FAILURE:
        yield put(updateBranchItemError(response.message));
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
    yield put(updateBranchItemError(error));
  }
}

//delete Branch

function deleteBranchApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}/Branch/delete`,
    headers: authHeader(),
    data: item
  });
}

const deleteBranchItemRequest = async item => {
  return await deleteBranchApi(item).then(res => res.data).catch(err => err)
};

function* deleteBranchItem({ payload }) {
  const { item, history } = payload;
  try {

    const response = yield call(deleteBranchItemRequest, item);
    // console.log(res);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteBranchItemSuccess(response.result));
        yield put(getBranchList(history));
        yield put(alertSuccess(response.message));
        break;

      case EC_FAILURE:
        yield put(deleteBranchItemError(response.message));
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
    yield put(deleteBranchItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(BRANCH_GET_LIST, getBranchListItems);
}

export function* wathcAddItem() {
  yield takeEvery(BRANCH_ADD_ITEM, addBranchItem);
}

export function* wathcUpdateItem() {
  yield takeEvery(BRANCH_UPDATE_ITEM, updateBranchItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(BRANCH_DELETE_ITEM, deleteBranchItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcUpdateItem), fork(wathcDeleteItem)]);
}
