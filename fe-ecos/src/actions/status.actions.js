import { statusConstants, errorCodeConstants } from '../constants';
import { PAGE_LIMIT } from '../constants/config';
import { statusService } from '../services';

function getList(pageNumber = 1, limit = PAGE_LIMIT, paramSearch = '') {
  
  return dispatch => {
    dispatch(request());

    setTimeout(function() {
      statusService.getList(pageNumber, limit, paramSearch)
        .then(res => {
          switch (res.error_code) {
            case errorCodeConstants.SUCCESS:
              dispatch(success(res.result, paramSearch));
              break;
            case errorCodeConstants.FAILURE: 
              dispatch(failure(res.message.toString()));
              break;
            default:
              break;
          }
        });
    }, 1000);
  };

  function request() { return { type: statusConstants.GET_LIST_REQUEST } }
  function success(status, paramSearch) { return { type: statusConstants.GET_LIST_SUCCESS, status, paramSearch } }
  function failure(error) { return { type: statusConstants.GET_LIST_FAILURE, error } }
}

export const statusActions = {
  getList
};