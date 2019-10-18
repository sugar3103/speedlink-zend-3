import {
  CODE_GET_LIST,
  CODE_GET_LIST_SUCCESS,
  CODE_GET_LIST_ERROR,
} from '../../../../constants/actionTypes';

const INIT_STATE = {
  items: [],
  total: 0,
  errors: null,
  loading: true,
  paramSearch: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case CODE_GET_LIST:
      const { params } = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case CODE_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case CODE_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    default: 
      return { ...state };
  }
}
