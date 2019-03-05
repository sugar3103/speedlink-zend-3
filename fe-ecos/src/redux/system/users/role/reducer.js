import {
  ROLE_TOGGLE_MODAL,
  ROLE_GET_LIST,
  ROLE_GET_LIST_SUCCESS,
  ROLE_GET_LIST_ERROR,
  ROLE_ADD_ITEM,
  ROLE_ADD_ITEM_SUCCESS,
  ROLE_ADD_ITEM_ERROR,
  ROLE_UPDATE_ITEM,
  ROLE_UPDATE_ITEM_SUCCESS,
  ROLE_UPDATE_ITEM_ERROR,
  ROLE_DELETE_ITEM,
  ROLE_DELETE_ITEM_SUCCESS,
  ROLE_DELETE_ITEM_ERROR,
  ROLE_CHANGE_TYPE_MODAL
} from '../../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
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

    case ROLE_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }

    case ROLE_GET_LIST:
      const params = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case ROLE_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return {
        ...state,
        loading: false,
        items,
        total
      };

    case ROLE_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case ROLE_ADD_ITEM:
      return {
        ...state,
        loading: false
      };

    case ROLE_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case ROLE_ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case ROLE_UPDATE_ITEM:
      return {
        ...state,
        loading: false
      };

    case ROLE_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case ROLE_UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case ROLE_DELETE_ITEM:
      return {
        ...state,
        loading: false
      };

    case ROLE_DELETE_ITEM_SUCCESS:
      return {
        ...state,
      };

    case ROLE_DELETE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case ROLE_CHANGE_TYPE_MODAL:
      return {
        ...state,
        modalType: action.payload
      };
    default:
      return { ...state };
  }
}
