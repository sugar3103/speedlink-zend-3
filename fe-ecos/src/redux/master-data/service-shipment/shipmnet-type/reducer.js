import {
  SHIPMENT_TYPE_TOGGLE_MODAL,
  SHIPMENT_TYPE_CHANGE_TYPE_MODAL,
  
  SHIPMENT_TYPE_GET_LIST,
  SHIPMENT_TYPE_GET_LIST_SUCCESS,
  SHIPMENT_TYPE_GET_LIST_ERROR,

  SHIPMENT_TYPE_ADD_ITEM,
  SHIPMENT_TYPE_ADD_ITEM_SUCCESS,
  SHIPMENT_TYPE_ADD_ITEM_ERROR,

  SHIPMENT_TYPE_UPDATE_ITEM,
  SHIPMENT_TYPE_UPDATE_ITEM_SUCCESS,
  SHIPMENT_TYPE_UPDATE_ITEM_ERROR,

  SHIPMENT_TYPE_DELETE_ITEM,
  SHIPMENT_TYPE_DELETE_ITEM_SUCCESS,
  SHIPMENT_TYPE_DELETE_ITEM_ERROR,

  SHIPMENT_TYPE_CODE_GET_LIST,
  SHIPMENT_TYPE_CODE_GET_LIST_SUCCESS,
  SHIPMENT_TYPE_CODE_GET_LIST_ERROR,

  SHIPMENT_TYPE_CARRIER_GET_LIST,
  SHIPMENT_TYPE_CARRIER_GET_LIST_SUCCESS,
  SHIPMENT_TYPE_CARRIER_GET_LIST_ERROR
} from '../../../../constants/actionTypes';

const INIT_STATE = {
  items: [],
  total: 0,
  errors: null,
  loading: true,
  modalOpen: false,
  modalData: null,
  modalType: null,
  paramSearch: null,
  codes: null,
  carriers: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHIPMENT_TYPE_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      };

    case SHIPMENT_TYPE_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case SHIPMENT_TYPE_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return {
        ...state,
        loading: false,
        items,
        total
      };

    case SHIPMENT_TYPE_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case SHIPMENT_TYPE_CODE_GET_LIST:
      return {
        ...state,
        loading: true
      };

    case SHIPMENT_TYPE_CODE_GET_LIST_SUCCESS:
      const { codes } = action.payload;
      return {
        ...state,
        loading: false,
        codes
      };

    case SHIPMENT_TYPE_CODE_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case SHIPMENT_TYPE_ADD_ITEM:
      return {
        ...state,
        loading: false
      };

    case SHIPMENT_TYPE_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case SHIPMENT_TYPE_ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case SHIPMENT_TYPE_UPDATE_ITEM:
      return {
        ...state,
        loading: false
      };

    case SHIPMENT_TYPE_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case SHIPMENT_TYPE_UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case SHIPMENT_TYPE_DELETE_ITEM:
      return {
        ...state,
        loading: false
      };

    case SHIPMENT_TYPE_DELETE_ITEM_SUCCESS:
      return {
        ...state,
      };

    case SHIPMENT_TYPE_DELETE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload
      };

    case SHIPMENT_TYPE_CHANGE_TYPE_MODAL: 
      return{
        ...state,
        modalType: action.payload
      }

    case SHIPMENT_TYPE_CARRIER_GET_LIST:
      return { 
        ...state, 
        loading: false,
      };

    case SHIPMENT_TYPE_CARRIER_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        carriers: action.payload
      };
    case SHIPMENT_TYPE_CARRIER_GET_LIST_ERROR:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return { ...state };
  }
}
