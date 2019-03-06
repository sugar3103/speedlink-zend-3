import {
  DISTRICT_TOGGLE_MODAL,
  DISTRICT_GET_LIST,
  DISTRICT_GET_LIST_SUCCESS,
  DISTRICT_GET_LIST_ERROR,
  DISTRICT_ADD_ITEM,
  DISTRICT_ADD_ITEM_SUCCESS,
  DISTRICT_ADD_ITEM_ERROR,
  DISTRICT_UPDATE_ITEM,
  DISTRICT_UPDATE_ITEM_SUCCESS,
  DISTRICT_UPDATE_ITEM_ERROR,
  DISTRICT_DELETE_ITEM,
  DISTRICT_DELETE_ITEM_SUCCESS,
  DISTRICT_DELETE_ITEM_ERROR,
  DISTRICT_CHANGE_TYPE_MODAL,
  DISTRICT_RESET_STATE
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

    case DISTRICT_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }

    case DISTRICT_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case DISTRICT_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return {
        ...state,
        loading: false,
        items,
        total
      };

    case DISTRICT_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case DISTRICT_ADD_ITEM:
      return {
        ...state,
        loading: false
      };

    case DISTRICT_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case DISTRICT_ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case DISTRICT_UPDATE_ITEM:
      return {
        ...state,
        loading: false
      };

    case DISTRICT_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case DISTRICT_UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case DISTRICT_DELETE_ITEM:
      return {
        ...state,
        loading: false
      };

    case DISTRICT_DELETE_ITEM_SUCCESS:
      return {
        ...state,
      };

    case DISTRICT_DELETE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case DISTRICT_CHANGE_TYPE_MODAL:
      return {
        ...state,
        modalType: action.payload
      }
    case DISTRICT_RESET_STATE:
      return INIT_STATE;

    default:
      return { ...state };
  }
}
