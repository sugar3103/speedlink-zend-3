import {
    BRANCHAREA_TOGGLE_MODAL,
    BRANCHAREA_GET_LIST,
    BRANCHAREA_GET_LIST_SUCCESS,
    BRANCHAREA_GET_LIST_ERROR,
    BRANCHAREA_ADD_ITEM,
    BRANCHAREA_ADD_ITEM_SUCCESS,
    BRANCHAREA_ADD_ITEM_ERROR,
    BRANCHAREA_UPDATE_ITEM,
    BRANCHAREA_UPDATE_ITEM_SUCCESS,
    BRANCHAREA_UPDATE_ITEM_ERROR,
    BRANCHAREA_DELETE_ITEM,
    BRANCHAREA_DELETE_ITEM_SUCCESS,
    BRANCHAREA_DELETE_ITEM_ERROR
  } from '../../../constants/actionTypes';
  
  const INIT_STATE = {
    items: null,
    total: 0,
    errors: null,
    loading: true,
    modalOpen: false,
    modalData: null,
    paramSearch: null
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
  
      case BRANCHAREA_TOGGLE_MODAL:
        return {
          ...state,
          modalOpen: !state.modalOpen,
          modalData: action.payload,
          errors: null
        }
  
      case BRANCHAREA_GET_LIST:
        const { params } = action.payload;
        return { 
          ...state, 
          loading: true,
          paramSearch: (params && params.query) ? params.query : null
        };
  
      case BRANCHAREA_GET_LIST_SUCCESS:
        const { items, total } = action.payload;
        return { 
          ...state, 
          loading: false, 
          items,
          total
        };
  
      case BRANCHAREA_GET_LIST_ERROR:
        return { 
          ...state, 
          loading: false, 
          errors: action.payload 
        };
  
      case BRANCHAREA_ADD_ITEM:
              return { 
          ...state, 
          loading: false 
        };
  
          case BRANCHAREA_ADD_ITEM_SUCCESS:
              return { 
          ...state, 
          loading: false, 
          errors: null
        };
  
          case BRANCHAREA_ADD_ITEM_ERROR:
              return { 
          ...state, 
          loading: false, 
          errors: action.payload 
        };
  
      case BRANCHAREA_UPDATE_ITEM:
              return { 
          ...state, 
          loading: false 
        };
  
          case BRANCHAREA_UPDATE_ITEM_SUCCESS:
              return { 
          ...state, 
          loading: false, 
          errors: null
        };
  
          case BRANCHAREA_UPDATE_ITEM_ERROR:
              return { 
          ...state, 
          loading: false, 
          errors: action.payload 
        };
  
      case BRANCHAREA_DELETE_ITEM:
              return { 
          ...state, 
          loading: false 
        };
  
          case BRANCHAREA_DELETE_ITEM_SUCCESS:
              return { 
          ...state, 
        };
  
          case BRANCHAREA_DELETE_ITEM_ERROR:
              return { 
          ...state, 
          errors: action.payload 
        };
  
      default: 
        return { ...state };
    }
  }
  