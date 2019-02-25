import {
  SHIPMENT_TYPE_TOGGLE_MODAL,
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
  CARRIER_GET_CODE_BY_CONDITION,
  CARRIER_GET_CODE_BY_CONDITION_SUCCESS,
  CARRIER_GET_CODE_BY_CONDITION_ERROR,

  SERVICE_GET_CODE_BY_CONDITION,
  SERVICE_GET_CODE_BY_CONDITION_SUCCESS,
  SERVICE_GET_CODE_BY_CONDITION_ERROR,

  SHIPMENT_TYPE_GET_CODE_BY_CONDITION,
  SHIPMENT_TYPE_GET_CODE_BY_CONDITION_SUCCESS,
  SHIPMENT_TYPE_GET_CODE_BY_CONDITION_ERROR
} from '../../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
  total: 0,
  errors: null,
  loading: true,
  modalOpen: false,
  modalData: null,
  paramSearch: null,
  codes: null,
  CarrierCodeByCondition: null,
  ServiceCodeByCondition: null,
  codeByCondition: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHIPMENT_TYPE_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload,
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

    case CARRIER_GET_CODE_BY_CONDITION:
      return {
        ...state,
        loading: true
      };

    case CARRIER_GET_CODE_BY_CONDITION_SUCCESS:
      const { CarrierCodeByCondition } = action.payload;
      return {
        ...state,
        loading: false,
        CarrierCodeByCondition
      };

    case CARRIER_GET_CODE_BY_CONDITION_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case SERVICE_GET_CODE_BY_CONDITION:
      return {
        ...state,
        loading: true
      };

    case SERVICE_GET_CODE_BY_CONDITION_SUCCESS:
      const { ServiceCodeByCondition } = action.payload;
      return {
        ...state,
        loading: false,
        ServiceCodeByCondition
      };

    case SERVICE_GET_CODE_BY_CONDITION_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case SHIPMENT_TYPE_GET_CODE_BY_CONDITION:
      return {
        ...state,
        loading: true
      };

    case SHIPMENT_TYPE_GET_CODE_BY_CONDITION_SUCCESS:
      const { codeByCondition } = action.payload;
      return {
        ...state,
        loading: false,
        codeByCondition
      };

    case SHIPMENT_TYPE_GET_CODE_BY_CONDITION_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    default:
      return { ...state };
  }
}
