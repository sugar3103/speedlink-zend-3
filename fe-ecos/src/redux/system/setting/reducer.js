import {
    SETTING_GET,
    SETTING_GET_SUCCESS,
    SETTING_GET_ERROR,
  } from '../../../constants/actionTypes';
  
  const INIT_STATE = {
    items: null,
    errors: null,
    loading: true,
    paramSearch: null
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case SETTING_GET:
        const { params } = action.payload;
        return { 
          ...state, 
          loading: true,
          paramSearch: (params && params.query) ? params.query : null
        };
  
      case SETTING_GET_SUCCESS:
        const { items } = action.payload;
        return { 
          ...state, 
          loading: false, 
          items
        };
  
      case SETTING_GET_ERROR:
        return { 
          ...state, 
          loading: false, 
          errors: action.payload 
        };
  
      default: 
        return { ...state };
    }
  }
  