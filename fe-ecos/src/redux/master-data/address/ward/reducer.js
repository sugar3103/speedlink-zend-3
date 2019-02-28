import {
  WARD_TOGGLE_MODAL,
  WARD_GET_LIST,
  WARD_GET_LIST_SUCCESS,
  WARD_GET_LIST_ERROR,
  WARD_ADD_ITEM,
  WARD_ADD_ITEM_SUCCESS,
  WARD_ADD_ITEM_ERROR,
  WARD_UPDATE_ITEM,
  WARD_UPDATE_ITEM_SUCCESS,
  WARD_UPDATE_ITEM_ERROR,
  WARD_DELETE_ITEM,
  WARD_DELETE_ITEM_SUCCESS,
  WARD_DELETE_ITEM_ERROR,
  WARD_CHANGE_TYPE_MODAL
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

    case WARD_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }

    case WARD_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case WARD_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return {
        ...state,
        loading: false,
        items,
        total
      };

    case WARD_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case WARD_ADD_ITEM:
      return {
        ...state,
        loading: false
      };

    case WARD_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case WARD_ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case WARD_UPDATE_ITEM:
      return {
        ...state,
        loading: false
      };

    case WARD_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case WARD_UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case WARD_DELETE_ITEM:
      return {
        ...state,
        loading: false
      };

    case WARD_DELETE_ITEM_SUCCESS:
      return {
        ...state,
      };

    case WARD_DELETE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case WARD_CHANGE_TYPE_MODAL:
      return {
        ...state,
        modalType: action.payload
      }
    default:
      return { ...state };
  }
}
