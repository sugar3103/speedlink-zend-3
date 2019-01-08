import { statusConstants } from '../constants';

export function status(state = {}, action) {
  switch (action.type) {
    case statusConstants.GET_LIST_REQUEST:
      return {
        loading: true,
      };
    case statusConstants.GET_LIST_SUCCESS:
      return {
        loading: false,
        paramSearch: action.paramSearch,
        items: action.status
      }
    case statusConstants.GET_LIST_FAILURE:
      return {
        error: action.error
      }
    case statusConstants.CREATE_REQUEST:
      return {
        ...state,
        creating: true
      };
    case statusConstants.CREATE_SUCCESS:
      return {}
    case statusConstants.CREATE_FAILURE:
      return {
        ...state,
        creating: false,
        error: action.error
      }
    case statusConstants.UPDATE_REQUEST:
      return {
        ...state,
        updating: true
      };
    case statusConstants.UPDATE_SUCCESS:
      return {}
    case statusConstants.UPDATE_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.error
      }
    case statusConstants.DELETE_REQUEST:
      return {
        ...state,
        deleting: true
      };
    case statusConstants.DELETE_SUCCESS:
      return {}
    case statusConstants.DELETE_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.error
      }
    default:
      return state;
  }
}