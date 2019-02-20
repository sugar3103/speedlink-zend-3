import {
    RANGEWEIGHT_TOGGLE_MODAL,
    RANGEWEIGHT_GET_LIST,
    RANGEWEIGHT_GET_LIST_SUCCESS,
    RANGEWEIGHT_GET_LIST_ERROR,
    RANGEWEIGHT_ADD_ITEM,
    RANGEWEIGHT_ADD_ITEM_SUCCESS,
    RANGEWEIGHT_ADD_ITEM_ERROR,
    RANGEWEIGHT_UPDATE_ITEM,
    RANGEWEIGHT_UPDATE_ITEM_SUCCESS,
    RANGEWEIGHT_UPDATE_ITEM_ERROR,
    RANGEWEIGHT_DELETE_ITEM,
    RANGEWEIGHT_DELETE_ITEM_SUCCESS,
    RANGEWEIGHT_DELETE_ITEM_ERROR
  } from '../../../constants/actionTypes';
  
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
      case RANGEWEIGHT_TOGGLE_MODAL:
        return {
          ...state,
          modalOpen: !state.modalOpen,
          modalData: action.payload,
          errors: null
        };
  
      case RANGEWEIGHT_GET_LIST:
        const { params } = action.payload;
        return {
          ...state,
          loading: true,
          paramSearch: (params && params.query) ? params.query : null
        };
  
      case RANGEWEIGHT_GET_LIST_SUCCESS:
        const { items, total } = action.payload;
        return {
          ...state,
          loading: false,
          items,
          total
        };
  
      case RANGEWEIGHT_GET_LIST_ERROR:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
  
      case RANGEWEIGHT_ADD_ITEM:
        return {
          ...state,
          loading: false
        };
  
      case RANGEWEIGHT_ADD_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          errors: null
        };
  
      case RANGEWEIGHT_ADD_ITEM_ERROR:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
  
      case RANGEWEIGHT_UPDATE_ITEM:
        return {
          ...state,
          loading: false
        };
  
      case RANGEWEIGHT_UPDATE_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          errors: null
        };
  
      case RANGEWEIGHT_UPDATE_ITEM_ERROR:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
  
      case RANGEWEIGHT_DELETE_ITEM:
        return {
          ...state,
          loading: false
        };
  
      case RANGEWEIGHT_DELETE_ITEM_SUCCESS:
        return {
          ...state,
        };
  
      case RANGEWEIGHT_DELETE_ITEM_ERROR:
        return {
          ...state,
          errors: action.payload
        };
  
      default:
        return { ...state };
    }
  }
  