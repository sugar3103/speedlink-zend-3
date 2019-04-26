import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import history from '../../../util/history';

import {
  ZONE_CODE_GET_LIST,
  ZONE_CODE_ADD_ITEM,
  ZONE_CODE_UPDATE_ITEM,
  ZONE_CODE_DELETE_ITEM,
  DESTINATION_COUNTRY_GET_LIST,
  DESTINATION_CITY_GET_LIST,
  DESTINATION_DISTRICT_GET_LIST,
  DESTINATION_WARD_GET_LIST,
  SHIPMENT_TYPE_GET_CODE_ZONE_CODE_BY_CONDITION,
  CARRIER_GET_CODE_ZONE_CODE_BY_CONDITION,
  SERVICE_GET_CODE_ZONE_CODE_BY_CONDITION

} from "../../../constants/actionTypes";

import {
  toggleZoneCodeModal,
  getZoneCodeListSuccess,
  getZoneCodeListError,
  addZoneCodeItemSuccess,
  addZoneCodeItemError,
  updateZoneCodeItemSuccess,
  updateZoneCodeItemError,
  deleteZoneCodeItemSuccess,
  deleteZoneCodeItemError,
  getZoneCodeList,

  getDestinationCountryListSuccess,
  getDestinationCountryListError,
  getDestinationCityListSuccess,
  getDestinationCityListError,
  getDestinationDistrictListSuccess,
  getDestinationDistrictListError,
  getDestinationWardListSuccess,
  getDestinationWardListError,

  getShipmentTypeCodeZoneCodeByConditionSuccess,
  getShipmentTypeCodeZoneCodeByConditionError,
  getCarrierCodeZoneCodeByConditionSuccess,
  getCarrierCodeZoneCodeByConditionError,
  getServiceCodeZoneCodeByConditionSuccess,
  getServiceCodeZoneCodeByConditionError
} from "./actions";

import createNotification from '../../../util/notifications';
import { startSubmit, stopSubmit } from 'redux-form';

//validate

function validateZoneCode(errors) {
  
  if (errors.code && errors.code.zonecodeExists) {
    return stopSubmit('zone_code_action_form', {
      code: 'range-weight.validate-code-exists'
    });
  }
}

//list zonecode

function getListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zone-code`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getZoneCodeListRequest = async (params) => {
  return await getListApi(params).then(res => res.data).catch(err => err)
};

function* getZoneCodeListItems({ payload }) {
  const { params, messages } = payload;
  try {
    const response = yield call(getZoneCodeListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getZoneCodeListSuccess(response.data, response.total));
        break;

      case EC_FAILURE:
        yield put(getZoneCodeListError(response.message));
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
    yield put(getZoneCodeListError(error));
  }
}

//add zonecode

function addZoneCodeApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zone-code/add`,
    headers: authHeader(),
    data: item
  });
}

const addZoneCodeItemRequest = async item => {
  return await addZoneCodeApi(item).then(res => res.data).catch(err => err)
};

function* addZoneCodeItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('zone_code_action_form'));
  try {
    const response = yield call(addZoneCodeItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(addZoneCodeItemSuccess());
        yield put(getZoneCodeList(null, messages));
        yield put(toggleZoneCodeModal());
        createNotification({
          type: 'success', 
          message: messages['zone_code.add-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(addZoneCodeItemError(response.data));
        yield put(validateZoneCode(response.data));
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
    yield put(addZoneCodeItemError(error));
  }
}

//update zonecode

function updateZoneCodeApi(item) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zone-code/edit`,
    headers: authHeader(),
    data: item
  });
}

const updateZoneCodeItemRequest = async item => {
  return await updateZoneCodeApi(item).then(res => res.data).catch(err => err)
};

function* updateZoneCodeItem({ payload }) {
  const { item, messages } = payload;
  yield put(startSubmit('zone_code_action_form'));
  try {
    const response = yield call(updateZoneCodeItemRequest, item);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(updateZoneCodeItemSuccess());
        yield put(getZoneCodeList(null, messages));
        yield put(toggleZoneCodeModal());
        createNotification({
          type: 'success', 
          message: messages['zone_code.update-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(updateZoneCodeItemError(response.data));
        yield put(validateZoneCode(response.data));
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
    yield put(updateZoneCodeItemError(error));
  }
}

//delete zonecode

function deleteZoneCodeApi(ids) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}zone-code/delete`,
    headers: authHeader(),
    data: {  ids: ids }
  });
}

const deleteZoneCodeItemRequest = async ids => {
  return await deleteZoneCodeApi(ids).then(res => res.data).catch(err => err)
};

function* deleteZoneCodeItem({ payload }) {
  const { ids, messages } = payload;
  try {
    const response = yield call(deleteZoneCodeItemRequest, ids);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(deleteZoneCodeItemSuccess());
        yield put(getZoneCodeList(null, messages));
        createNotification({
          type: 'success', 
          message: messages['zone_code.delete-success'], 
          title: messages['notification.success']
        });
        break;

      case EC_FAILURE:
        yield put(deleteZoneCodeItemError(response.data));
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
    yield put(deleteZoneCodeItemError(error));
  }
}


//list destination country

function getDestinationCountryListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/country`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDestinationCountryListRequest = async (params) => {
  return await getDestinationCountryListApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationCountryListItems({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getDestinationCountryListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationCountryListSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getDestinationCountryListError(response.data));
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
    yield put(getDestinationCountryListError(error));
  }
}

//list Destination city

function getDestinationCityListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/city`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDestinationCityListRequest = async (params) => {
  return await getDestinationCityListApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationCityListItems({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getDestinationCityListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationCityListSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getDestinationCityListError(response.data));
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
    yield put(getDestinationCityListError(error));
  }
}

//list Destination district

function getDestinationDistrictListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/district`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDestinationDistrictListRequest = async (params) => {
  return await getDestinationDistrictListApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationDistrictListItems({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getDestinationDistrictListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationDistrictListSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getDestinationDistrictListError(response.data));
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
    yield put(getDestinationDistrictListError(error));
  }
}

//list Destination ward

function getDestinationWardListApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}address/ward`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getDestinationWardListRequest = async (params) => {
  return await getDestinationWardListApi(params).then(res => res.data).catch(err => err)
};

function* getDestinationWardListItems({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getDestinationWardListRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getDestinationWardListSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getDestinationWardListError(response.data));
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
    yield put(getDestinationWardListError(error));
  }
}

//list shipment_type code
function getCodeByConditionApi(params) {
  return axios.request({
    method: 'post',
    url: `${apiUrl}shipment_type/codeByCondition`,
    headers: authHeader(),
    data: JSON.stringify(params)
  });
}

const getShipmentTypeCodeByConditionRequest = async (params) => {
  return await getCodeByConditionApi(params).then(res => res.data).catch(err => err)
};

function* getShipmentTypeCodeZoneCodeByCondition({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getShipmentTypeCodeByConditionRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getShipmentTypeCodeZoneCodeByConditionSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getShipmentTypeCodeZoneCodeByConditionError(response.data));
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
    yield put(getShipmentTypeCodeZoneCodeByConditionError(error));
  }
}

function* getCarrierCodeZoneCodeByCondition({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getShipmentTypeCodeByConditionRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getCarrierCodeZoneCodeByConditionSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getCarrierCodeZoneCodeByConditionError(response.data));
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
    yield put(getCarrierCodeZoneCodeByConditionError(error));
  }
}

function* getServiceCodeZoneCodeByCondition({ payload }) {
  const { params, messages, types } = payload;
  try {
    const response = yield call(getShipmentTypeCodeByConditionRequest, params);
    switch (response.error_code) {
      case EC_SUCCESS:
        yield put(getServiceCodeZoneCodeByConditionSuccess(response.data, types));
        break;

      case EC_FAILURE:
        yield put(getServiceCodeZoneCodeByConditionError(response.data));
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
    yield put(getServiceCodeZoneCodeByConditionError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ZONE_CODE_GET_LIST, getZoneCodeListItems);
}

export function* watchAddItem() {
  yield takeEvery(ZONE_CODE_ADD_ITEM, addZoneCodeItem);
}

export function* watchUpdateItem() {
  yield takeEvery(ZONE_CODE_UPDATE_ITEM, updateZoneCodeItem);
}

export function* watchDeleteItem() {
  yield takeEvery(ZONE_CODE_DELETE_ITEM, deleteZoneCodeItem);
}

export function* watchDestinationCountryGetList() {
  yield takeEvery(DESTINATION_COUNTRY_GET_LIST, getDestinationCountryListItems);
}
export function* watchDestinationCityGetList() {
  yield takeEvery(DESTINATION_CITY_GET_LIST, getDestinationCityListItems);
}
export function* watchDestinationDistrictGetList() {
  yield takeEvery(DESTINATION_DISTRICT_GET_LIST, getDestinationDistrictListItems);
}
export function* watchDestinationWardGetList() {
  yield takeEvery(DESTINATION_WARD_GET_LIST, getDestinationWardListItems);
}

export function* watchGetListCodeByCondition() {
  yield takeEvery(SHIPMENT_TYPE_GET_CODE_ZONE_CODE_BY_CONDITION, getShipmentTypeCodeZoneCodeByCondition);
}
export function* watchGetListCarrierCodeByCondition() {
  yield takeEvery(CARRIER_GET_CODE_ZONE_CODE_BY_CONDITION, getCarrierCodeZoneCodeByCondition);
}
export function* watchGetListServiceCodeByCondition() {
  yield takeEvery(SERVICE_GET_CODE_ZONE_CODE_BY_CONDITION, getServiceCodeZoneCodeByCondition);
}
// chua xong saga
export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem),
    fork(watchDestinationCountryGetList), fork(watchDestinationCityGetList), fork(watchDestinationDistrictGetList), fork(watchDestinationWardGetList),
    fork(watchGetListCodeByCondition),
    fork(watchGetListCarrierCodeByCondition),
    fork(watchGetListServiceCodeByCondition)
  ]);
}
