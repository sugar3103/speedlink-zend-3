import { statusConstants } from '../../constants';

export function status(state = {}, action) {
  switch (action.type) {
    case statusConstants.GET_LIST_REQUEST:
      return {
        loading: true
      };
    case statusConstants.GET_LIST_SUCCESS:
      return {
        items: action.status
      }
    case statusConstants.GET_LIST_FAILURE:
      return {
        error: action.error
      }
    default:
      return state;
  }
}