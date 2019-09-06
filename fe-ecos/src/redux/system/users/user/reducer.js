import {
  USER_TOGGLE_MODAL,
  USER_GET_LIST,
  USER_GET_LIST_SUCCESS,
  USER_GET_LIST_ERROR,
  USER_ADD_ITEM,
  USER_ADD_ITEM_SUCCESS,
  USER_ADD_ITEM_ERROR,
  USER_UPDATE_ITEM,
  USER_UPDATE_ITEM_SUCCESS,
  USER_UPDATE_ITEM_ERROR,
  USER_DELETE_ITEM,
  USER_DELETE_ITEM_SUCCESS,
  USER_DELETE_ITEM_ERROR,
  USER_CHANGE_TYPE_MODAL,
  USER_UPLOAD_AVATAR
} from '../../../../constants/actionTypes';

const INIT_STATE = {
  items: [],
  total: 0,
  errors: null,
  loading: true,
  modalOpen: false,
  modalData: null,
  modalType: null,
  paramSearch: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case USER_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        error: null
      }

    case USER_GET_LIST:
      const params = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case USER_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return {
        ...state,
        loading: false,
        items,
        total
      };

    case USER_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case USER_ADD_ITEM:
      return {
        ...state,
        loading: false
      };

    case USER_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case USER_ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case USER_UPDATE_ITEM:
      return {
        ...state,
        loading: false
      };

    case USER_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case USER_UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case USER_DELETE_ITEM:
      return {
        ...state,
        loading: false
      };

    case USER_DELETE_ITEM_SUCCESS:
      return {
        ...state,
      };

    case USER_DELETE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case USER_CHANGE_TYPE_MODAL:
      return {
        ...state,
        modalType: action.payload
      };
    case USER_UPLOAD_AVATAR:
      return {
        ...state,
        loading: false
      }
    default:
      return { ...state };
  }
}
