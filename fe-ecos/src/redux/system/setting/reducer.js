import {
    SYSTEM_GET_LIST,
    SYSTEM_GET_LIST_SUCCESS,
    SYSTEM_GET_LIST_ERROR,
  } from '../../../../constants/actionTypes';
  
  const INIT_STATE = {
    items: null,
    errors: null,
    loading: true,
    paramSearch: null
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case SYSTEM_GET_LIST:
        const { params } = action.payload;
        return { 
          ...state, 
          loading: true,
          paramSearch: (params && params.query) ? params.query : null
        };
  
      case SYSTEM_GET_LIST_SUCCESS:
        const { items } = action.payload;
        return { 
          ...state, 
          loading: false, 
          items
        };
  
      case SYSTEM_GET_LIST_ERROR:
        return { 
          ...state, 
          loading: false, 
          errors: action.payload 
        };
  
      default: 
        return { ...state };
    }
  }
  