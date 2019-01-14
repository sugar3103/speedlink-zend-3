import {
  ADDRESS_GET_LIST,
  ADDRESS_GET_LIST_SUCCESS,
  ADDRESS_GET_LIST_ERROR,
} from '../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
  error: null,
  loading: true,
  paramSearch: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADDRESS_GET_LIST:
      const { params } = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case ADDRESS_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        items: action.payload 
      };

    case ADDRESS_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    default: 
      return { ...state };
  }
}
