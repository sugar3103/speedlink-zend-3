import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  CUSTOMER_GET_LIST,
  CUSTOMER_ADD_ITEM,
  CUSTOMER_UPDATE_ITEM,
  CUSTOMER_DELETE_ITEM 
} from "../../../constants/actionTypes";

import {
  toggleCustomerModal,
  getCustomerListSuccess,
  getCustomerListError,
  addCustomerItemSuccess,
  addCustomerItemError,
  updateCustomerItemSuccess,
  updateCustomerItemError,
  deleteCustomerItemSuccess,
  deleteCustomerItemError,
  getCustomerList,
} from "./actions";

import createNotification from '../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate
function validateCustomer(errors) {
  if (errors.name && errors.name.customerExists) {
    return stopSubmit('customer_action_form', {
      name: 'customer.validate-name-exists'
    });
  }
  if (errors.name_en && errors.name_en.customerExists) {
    return stopSubmit('customer_action_form', {
      name_en: 'customer.validate-nameEn-exists'
    });
  }
}

//list customer

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}customer`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getCustomerListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getCustomerListItems({ payload }) {
  const { params } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(getCustomerListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCustomerListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getCustomerListError(response.message));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
    
  } catch (error) {
    yield put(getCustomerListError(error));
  }
}

//add customer

function addCustomerApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}customer/add`,
    headers: authHeader(),
    data: item
  });
}

const addCustomerItemRequest = async item => {
  return await addCustomerApi(item).then(res => res.data).catch(err => err)
};

function* addCustomerItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('customer_action_form'));
  try {
    const response = yield call(addCustomerItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addCustomerItemSuccess());
        yield put(getCustomerList());
        yield put(toggleCustomerModal());
        createNotification({ type: 'success', message: 'customer.add-success' });
        break;

      case EC_FAILURE:
        yield put(addCustomerItemError(response.message));
        yield put(validateCustomer(response.data));
        break;
      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(addCustomerItemError(error));
  }
}

//update customer

function updateCustomerApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}customer/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateCustomerItemRequest = async item => {
  return await updateCustomerApi(item).then(res => res.data).catch(err => err)
};

function* updateCustomerItem({ payload }) {
  const { item } = payload;
  const { pathname } = history.location;
  yield put(startSubmit('customer_action_form'));
  try {
    const response = yield call(updateCustomerItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateCustomerItemSuccess());
        yield put(getCustomerList());
        yield put(toggleCustomerModal());
        createNotification({ type: 'success', message: 'customer.update-success' });
        break;

      case EC_FAILURE:
        yield put(updateCustomerItemError(response.data));
        yield put(validateCustomer(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(updateCustomerItemError(error));
  }
}

//delete customer

function deleteCustomerApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}customer/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteCustomerItemRequest = async ids => {
  return await deleteCustomerApi(ids).then(res => res.data).catch(err => err)
};

function* deleteCustomerItem({ payload }) {
  const { ids } = payload;
  const { pathname } = history.location;
  try {
    const response = yield call(deleteCustomerItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteCustomerItemSuccess());
        yield put(getCustomerList());
        createNotification({ type: 'success', message: 'customer.delete-success'});
        break;

      case EC_FAILURE:
        yield put(deleteCustomerItemError(response.data));
        break;

      case EC_FAILURE_AUTHENCATION:
        localStorage.removeItem('authUser');
        yield call(history.push, '/login', { from: pathname });
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(deleteCustomerItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(CUSTOMER_GET_LIST, getCustomerListItems);
}

export function* watchAddItem() {
  yield takeEvery(CUSTOMER_ADD_ITEM, addCustomerItem);
}

export function* watchUpdateItem() {
  yield takeEvery(CUSTOMER_UPDATE_ITEM, updateCustomerItem);
}

export function* watchDeleteItem() {
  yield takeEvery(CUSTOMER_DELETE_ITEM, deleteCustomerItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem)]);
}
