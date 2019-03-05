import {
  SERVICE_TOGGLE_MODAL,
  SERVICE_GET_LIST,
  SERVICE_GET_LIST_SUCCESS,
  SERVICE_GET_LIST_ERROR,
  SERVICE_ADD_ITEM,
  SERVICE_ADD_ITEM_SUCCESS,
  SERVICE_ADD_ITEM_ERROR,
  SERVICE_UPDATE_ITEM,
  SERVICE_UPDATE_ITEM_SUCCESS,
  SERVICE_UPDATE_ITEM_ERROR,
  SERVICE_DELETE_ITEM,
  SERVICE_DELETE_ITEM_SUCCESS,
  SERVICE_DELETE_ITEM_ERROR,
  SERVICE_CODE_GET_LIST,
  SERVICE_CODE_GET_LIST_SUCCESS,
  SERVICE_CODE_GET_LIST_ERROR,
  SERVICE_CHANGE_TYPE_MODAL
} from '../../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
  total: 0,
  errors: null,
  loading: true,
  modalOpen: false,
  modalType: null,
  modalData: null,
  paramSearch: null,
  codes: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SERVICE_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      };

    case SERVICE_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case SERVICE_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return {
        ...state,
        loading: false,
        items,
        total
      };

    case SERVICE_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case SERVICE_CODE_GET_LIST:
      return {
        ...state,
        loading: true
      };

    case SERVICE_CODE_GET_LIST_SUCCESS:
      const { codes } = action.payload;
      return {
        ...state,
        loading: false,
        codes
      };

    case SERVICE_CODE_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case SERVICE_ADD_ITEM:
      return {
        ...state,
        loading: false
      };

    case SERVICE_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case SERVICE_ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case SERVICE_UPDATE_ITEM:
      return {
        ...state,
        loading: false
      };

    case SERVICE_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case SERVICE_UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case SERVICE_DELETE_ITEM:
      return {
        ...state,
        loading: false
      };

    case SERVICE_DELETE_ITEM_SUCCESS:
      return {
        ...state,
      };

    case SERVICE_DELETE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case SERVICE_CHANGE_TYPE_MODAL:
      return {
        ...state,
        modalType: action.payload
      }
    default:
      return { ...state };
  }
}
