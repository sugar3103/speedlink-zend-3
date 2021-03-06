import {
  PRI_DOM_RANGE_WEIGHT_ERROR,

  PRI_DOM_RANGE_WEIGHT_GET_LIST,
  PRI_DOM_RANGE_WEIGHT_GET_LIST_SUCCESS,

  PRI_DOM_RANGE_WEIGHT_ADD_ITEM,
  PRI_DOM_RANGE_WEIGHT_ADD_ITEM_SUCCESS,

  PRI_DOM_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  PRI_DOM_RANGE_WEIGHT_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_DOM_RANGE_WEIGHT_UPDATE_ITEM,
  PRI_DOM_RANGE_WEIGHT_UPDATE_ITEM_SUCCESS,

  PRI_DOM_RANGE_WEIGHT_DELETE_ITEM,
  PRI_DOM_RANGE_WEIGHT_DELETE_ITEM_SUCCESS,
} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loading: false,
  items: [],
  itemEditting: {},
  total: 0,
  paramSearch: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRI_DOM_RANGE_WEIGHT_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case PRI_DOM_RANGE_WEIGHT_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case PRI_DOM_RANGE_WEIGHT_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case PRI_DOM_RANGE_WEIGHT_REQUEST_UPDATE_ITEM:
      return { 
        ...state, 
        loading: true 
      };

    case PRI_DOM_RANGE_WEIGHT_REQUEST_UPDATE_ITEM_SUCCESS:
      return { 
        ...state, 
        loading: false,
        itemEditting: action.payload 
      };

    case PRI_DOM_RANGE_WEIGHT_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_DOM_RANGE_WEIGHT_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

    case PRI_DOM_RANGE_WEIGHT_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_DOM_RANGE_WEIGHT_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };
      
    case PRI_DOM_RANGE_WEIGHT_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_DOM_RANGE_WEIGHT_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

    default:
      return { ...state };
  }
}
