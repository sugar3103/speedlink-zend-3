import { statusConstants } from '../constants';
import { statusService } from '../services';

function getList(pageNumber = 1) {
    return dispatch => {
        dispatch(request());

        statusService.getList(pageNumber)
            .then(
                status => dispatch(success(status)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: statusConstants.GET_LIST_REQUEST } }
    function success(status) { return { type: statusConstants.GET_LIST_SUCCESS, status } }
    function failure(error) { return { type: statusConstants.GET_LIST_FAILURE, error } }
}

export const statusActions = {
    getList,
};