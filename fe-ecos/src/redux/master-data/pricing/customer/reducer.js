import {
    CUSTOMER_TOGGLE_MODAL,
    CUSTOMER_GET_LIST,
    CUSTOMER_GET_LIST_SUCCESS,
    CUSTOMER_GET_LIST_ERROR
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
      case CUSTOMER_TOGGLE_MODAL:
        return {
          ...state,
          modalOpen: !state.modalOpen,
          modalData: action.payload,
          errors: null
        };
  
      case CUSTOMER_GET_LIST:
        const { params } = action.payload;
        return {
          ...state,
          loading: true,
          paramSearch: (params && params.query) ? params.query : null
        };
  
      case CUSTOMER_GET_LIST_SUCCESS:
        const { items, total } = action.payload;
        return {
          ...state,
          loading: false,
          items,
          total
        };
  
      case CUSTOMER_GET_LIST_ERROR:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
  
      default:
        return { ...state };
    }
  }
  