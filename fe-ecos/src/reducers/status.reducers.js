import { statusConstants } from '../constants';

export function status(state = {}, action) {
  switch (action.type) {
    case statusConstants.GET_LIST_REQUEST:
      return {
        loading: true,
      };
    case statusConstants.GET_LIST_SUCCESS:
      return {
        paramSearch: action.paramSearch,
        items: action.status
      }
    case statusConstants.GET_LIST_FAILURE:
      return {
        error: action.error
      }
    case statusConstants.SEARCH_REQUEST:
      return {
        searching: true
      };
    default:
      return state;
  }
}