import {
    RANGE_WEIGHT_TOGGLE_MODAL,
    RANGE_WEIGHT_GET_LIST,
    RANGE_WEIGHT_GET_LIST_SUCCESS,
    RANGE_WEIGHT_GET_LIST_ERROR,
    RANGE_WEIGHT_ADD_ITEM,
    RANGE_WEIGHT_ADD_ITEM_SUCCESS,
    RANGE_WEIGHT_ADD_ITEM_ERROR,
    RANGE_WEIGHT_UPDATE_ITEM,
    RANGE_WEIGHT_UPDATE_ITEM_SUCCESS,
    RANGE_WEIGHT_UPDATE_ITEM_ERROR,
    RANGE_WEIGHT_DELETE_ITEM,
    RANGE_WEIGHT_DELETE_ITEM_SUCCESS,
    RANGE_WEIGHT_DELETE_ITEM_ERROR,
    RANGE_WEIGHT_CHANGE_TYPE_MODAL,
    CARRIER_GET_CODE_BY_CONDITION,
    CARRIER_GET_CODE_BY_CONDITION_SUCCESS,
    CARRIER_GET_CODE_BY_CONDITION_ERROR,

    SERVICE_GET_CODE_BY_CONDITION,
    SERVICE_GET_CODE_BY_CONDITION_SUCCESS,
    SERVICE_GET_CODE_BY_CONDITION_ERROR,

    SHIPMENT_TYPE_GET_CODE_BY_CONDITION,
    SHIPMENT_TYPE_GET_CODE_BY_CONDITION_SUCCESS,
    SHIPMENT_TYPE_GET_CODE_BY_CONDITION_ERROR
  } from '../../../constants/actionTypes';
  
  const INIT_STATE = {
    items: null,
    total: 0,
    errors: null,
    loading: true,
    modalOpen: false,
    modalType: null,
    modalData: null,
    paramSearch: null,
    codes: null,
    CarrierCodeByCondition: null,
    ServiceCodeByCondition: null,
    ShipmentCodeByCondition: null
  };
  
  export default (state = INIT_STATE, action) => {
    let types = null;
    switch (action.type) {
      case RANGE_WEIGHT_TOGGLE_MODAL:
      if(action.payload.type === 'add')
        return {
          ...state,
          modalOpen: !state.modalOpen,
          modalData: action.payload.data,
          modalType: action.payload.type,
          errors: null,
          CarrierCodeByCondition: null,
          ServiceCodeByCondition: null,
          ShipmentCodeByCondition: null
        };
      else
        return {
          ...state,
          modalOpen: !state.modalOpen,
          modalData: action.payload.data,
          modalType: action.payload.type,
          errors: null
        };
  
      case RANGE_WEIGHT_CHANGE_TYPE_MODAL:
			return { 
        ...state, 
        modalType: action.payload
      };
      
      case RANGE_WEIGHT_GET_LIST:
        const { params } = action.payload;
        return {
          ...state,
          loading: true,
          paramSearch: (params && params.query) ? params.query : null
        };
  
      case RANGE_WEIGHT_GET_LIST_SUCCESS:
        const { items, total } = action.payload;
        return {
          ...state,
          loading: false,
          items,
          total
        };
  
      case RANGE_WEIGHT_GET_LIST_ERROR:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
  
      case RANGE_WEIGHT_ADD_ITEM:
        return {
          ...state,
          loading: false
        };
  
      case RANGE_WEIGHT_ADD_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          errors: null
        };
  
      case RANGE_WEIGHT_ADD_ITEM_ERROR:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
  
      case RANGE_WEIGHT_UPDATE_ITEM:
        return {
          ...state,
          loading: false
        };
  
      case RANGE_WEIGHT_UPDATE_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          errors: null
        };
  
      case RANGE_WEIGHT_UPDATE_ITEM_ERROR:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
  
      case RANGE_WEIGHT_DELETE_ITEM:
        return {
          ...state,
          loading: false
        };
  
      case RANGE_WEIGHT_DELETE_ITEM_SUCCESS:
        return {
          ...state,
        };
  
      case RANGE_WEIGHT_DELETE_ITEM_ERROR:
        return {
          ...state,
          errors: action.payload
        };

      case CARRIER_GET_CODE_BY_CONDITION:
        return {
          ...state,
        };
  
      case CARRIER_GET_CODE_BY_CONDITION_SUCCESS:
        const { CarrierCodeByCondition } = action.payload;
        types = action.payload.types;
        if(types ==='onchange')
          return {
            ...state,
            loading: false,
            CarrierCodeByCondition,
            ServiceCodeByCondition: null,
            ShipmentCodeByCondition: null
          };
        else
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
        };
  
      case SERVICE_GET_CODE_BY_CONDITION_SUCCESS:
        const { ServiceCodeByCondition } = action.payload;
        types = action.payload.types;
        if(types ==='onchange')
        return {
          ...state,
          loading: false,
          ServiceCodeByCondition,
          ShipmentCodeByCondition: null
        };
        else
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
        };
  
      case SHIPMENT_TYPE_GET_CODE_BY_CONDITION_SUCCESS:
        const { ShipmentCodeByCondition } = action.payload;
        return {
          ...state,
          ShipmentCodeByCondition
        };
  
      case SHIPMENT_TYPE_GET_CODE_BY_CONDITION_ERROR:
        return {
          ...state,
          errors: action.payload
        };
  
      default:
        return { ...state };
    }
  }
  