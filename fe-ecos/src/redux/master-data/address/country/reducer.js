import {
  COUNTRY_TOGGLE_MODAL,
  COUNTRY_GET_LIST,
  COUNTRY_GET_LIST_SUCCESS,
  COUNTRY_GET_LIST_ERROR,
  COUNTRY_ADD_ITEM,
  COUNTRY_ADD_ITEM_SUCCESS,
  COUNTRY_ADD_ITEM_ERROR,
  COUNTRY_UPDATE_ITEM,
  COUNTRY_UPDATE_ITEM_SUCCESS,
  COUNTRY_UPDATE_ITEM_ERROR,
  COUNTRY_DELETE_ITEM,
  COUNTRY_DELETE_ITEM_SUCCESS,
  COUNTRY_DELETE_ITEM_ERROR,
  COUNTRY_CHANGE_TYPE_MODAL
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

    case COUNTRY_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }

    case COUNTRY_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case COUNTRY_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return {
        ...state,
        loading: false,
        items,
        total
      };

    case COUNTRY_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case COUNTRY_ADD_ITEM:
      return {
        ...state,
        loading: false
      };

    case COUNTRY_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case COUNTRY_ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case COUNTRY_UPDATE_ITEM:
      return {
        ...state,
        loading: false
      };

    case COUNTRY_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case COUNTRY_UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case COUNTRY_DELETE_ITEM:
      return {
        ...state,
        loading: false
      };

    case COUNTRY_DELETE_ITEM_SUCCESS:
      return {
        ...state,
      };

    case COUNTRY_DELETE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case COUNTRY_CHANGE_TYPE_MODAL:
      return {
        ...state,
        modalType: action.payload
      }
    default:
      return { ...state };
  }
}
