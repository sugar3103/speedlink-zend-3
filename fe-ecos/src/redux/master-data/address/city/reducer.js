import {
  CITY_TOGGLE_MODAL,
  CITY_GET_LIST,
  CITY_GET_LIST_SUCCESS,
  CITY_GET_LIST_ERROR,
  CITY_ADD_ITEM,
  CITY_ADD_ITEM_SUCCESS,
  CITY_ADD_ITEM_ERROR,
  CITY_UPDATE_ITEM,
  CITY_UPDATE_ITEM_SUCCESS,
  CITY_UPDATE_ITEM_ERROR,
  CITY_DELETE_ITEM,
  CITY_DELETE_ITEM_SUCCESS,
  CITY_DELETE_ITEM_ERROR,
  CITY_CHANGE_TYPE_MODAL
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

    case CITY_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }

    case CITY_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case CITY_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return {
        ...state,
        loading: false,
        items,
        total
      };

    case CITY_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case CITY_ADD_ITEM:
      return {
        ...state,
        loading: false
      };

    case CITY_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case CITY_ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case CITY_UPDATE_ITEM:
      return {
        ...state,
        loading: false
      };

    case CITY_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case CITY_UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case CITY_DELETE_ITEM:
      return {
        ...state,
        loading: false
      };

    case CITY_DELETE_ITEM_SUCCESS:
      return {
        ...state,
      };

    case CITY_DELETE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case CITY_CHANGE_TYPE_MODAL:
      return {
        ...state,
        modalType: action.payload
      };

    default:
      return { ...state };
  }
}
