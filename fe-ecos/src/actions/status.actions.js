import { statusConstants, errorCodeConstants } from '../constants';
import { PAGE_LIMIT } from '../constants/config';
import { statusService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import { modalActions } from './modal.actions';

function getList(pageNumber = 1, limit = PAGE_LIMIT, paramSearch = {}) {
  return dispatch => {
    dispatch(request());

    statusService.getList(pageNumber, limit, paramSearch)
      .then(res => {
        switch (res.error_code) {
          case errorCodeConstants.SUCCESS:
            dispatch(success(res.result, paramSearch));
            break;
          case errorCodeConstants.FAILURE: 
            dispatch(failure(res.message.toString()));
            break;
          case errorCodeConstants.FAILURE_AUTHENCATION:
            localStorage.removeItem('user');
            history.push('/login');
            dispatch(alertActions.error('Please login to continue'));
            break;
          default:
            break;
        }
      });
  };

  function request() { return { type: statusConstants.GET_LIST_REQUEST } }
  function success(status, paramSearch) { return { type: statusConstants.GET_LIST_SUCCESS, status, paramSearch } }
  function failure(error) { return { type: statusConstants.GET_LIST_FAILURE, error } }
}

function create(status) {
  return dispatch => {
    dispatch(request(status));

    statusService.create(status).then(res => {
      switch (res.error_code) {
        case errorCodeConstants.SUCCESS:
          dispatch(success());
          dispatch(modalActions.close());
          dispatch(alertActions.success(res.result.message));
          dispatch(this.getList(1, PAGE_LIMIT));
          break;
        case errorCodeConstants.FAILURE: 
          dispatch(failure(res.message));
          break;
        case errorCodeConstants.FAILURE_AUTHENCATION:
          localStorage.removeItem('user');
          history.push('/login');
          dispatch(alertActions.error('Please login to continue'));
          break;
        default:
          break;
      }
    });
  }

  function request(status) { return { type: statusConstants.CREATE_REQUEST, status } }
  function success() { return { type: statusConstants.CREATE_SUCCESS } }
  function failure(error) { return { type: statusConstants.CREATE_FAILURE, error } }
}

function update(status) {
  return dispatch => {
    dispatch(request(status));

    statusService.update(status).then(res => {
      switch (res.error_code) {
        case errorCodeConstants.SUCCESS:
          dispatch(success());
          dispatch(modalActions.close());
          dispatch(alertActions.success(res.result.message));
          dispatch(this.getList(1, PAGE_LIMIT));
          break;
        case errorCodeConstants.FAILURE: 
          dispatch(failure(res.message));
          break;
        case errorCodeConstants.FAILURE_AUTHENCATION:
          localStorage.removeItem('user');
          history.push('/login');
          dispatch(alertActions.error('Please login to continue'));
          break;
        default:
          break;
      }
    });
  }

  function request(status) { return { type: statusConstants.UPDATE_REQUEST, status } }
  function success() { return { type: statusConstants.UPDATE_SUCCESS } }
  function failure(error) { return { type: statusConstants.UPDATE_FAILURE, error } }
}

function remove(id) { 
  return dispatch => {
    dispatch(request());

    statusService.remove(id).then(res => {
      switch (res.error_code) {
        case errorCodeConstants.SUCCESS:
          dispatch(success());
          dispatch(alertActions.success(res.result.message));
          dispatch(this.getList(1, PAGE_LIMIT));
          break;
        case errorCodeConstants.FAILURE: 
          dispatch(failure(res.message));
          break;
        case errorCodeConstants.FAILURE_AUTHENCATION:
          localStorage.removeItem('user');
          history.push('/login');
          dispatch(alertActions.error('Please login to continue'));
          break;
        default:
          break;
      }
    });
  }

  function request() { return { type: statusConstants.DELETE_REQUEST } }
  function success() { return { type: statusConstants.DELETE_SUCCESS } }
  function failure(error) { return { type: statusConstants.DELETE_FAILURE, error } }
}

export const statusActions = {
  getList,
  create,
  update,
  remove
};