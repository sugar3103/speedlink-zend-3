import {
  CARRIER_TOGGLE_MODAL,
  CARRIER_GET_LIST,
  CARRIER_GET_LIST_SUCCESS,
  CARRIER_GET_LIST_ERROR,
  CARRIER_ADD_ITEM,
  CARRIER_ADD_ITEM_SUCCESS,
  CARRIER_ADD_ITEM_ERROR,
  CARRIER_UPDATE_ITEM,
  CARRIER_UPDATE_ITEM_SUCCESS,
  CARRIER_UPDATE_ITEM_ERROR,
  CARRIER_DELETE_ITEM,
  CARRIER_DELETE_ITEM_SUCCESS,
  CARRIER_DELETE_ITEM_ERROR,
  CARRIER_CODE_GET_LIST,
  CARRIER_CODE_GET_LIST_SUCCESS,
  CARRIER_CODE_GET_LIST_ERROR
} from '../../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
  total: 0,
  errors: null,
  loading: true,
  modalOpen: false,
  modalData: null,
  paramSearch: null,
  codes: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CARRIER_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload,
        errors: null
      };

    case CARRIER_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case CARRIER_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return {
        ...state,
        loading: false,
        items,
        total
      };

    case CARRIER_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case CARRIER_CODE_GET_LIST:
      return {
        ...state,
        loading: true
      };

    case CARRIER_CODE_GET_LIST_SUCCESS:
      const { codes } = action.payload;
      return {
        ...state,
        loading: false,
        codes
      };

    case CARRIER_CODE_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case CARRIER_ADD_ITEM:
      return {
        ...state,
        loading: false
      };

    case CARRIER_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case CARRIER_ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case CARRIER_UPDATE_ITEM:
      return {
        ...state,
        loading: false
      };

    case CARRIER_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case CARRIER_UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case CARRIER_DELETE_ITEM:
      return {
        ...state,
        loading: false
      };

    case CARRIER_DELETE_ITEM_SUCCESS:
      return {
        ...state,
      };

    case CARRIER_DELETE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return { ...state };
  }
}
