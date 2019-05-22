import {
  PRI_DOM_PRICING_ERROR,

  PRI_DOM_PRICING_GET_LIST,
  PRI_DOM_PRICING_GET_LIST_SUCCESS,

  PRI_DOM_PRICING_ADD_ITEM,
  PRI_DOM_PRICING_ADD_ITEM_SUCCESS,

  PRI_DOM_PRICING_REQUEST_UPDATE_ITEM,
  PRI_DOM_PRICING_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_DOM_PRICING_UPDATE_ITEM,
  PRI_DOM_PRICING_UPDATE_ITEM_SUCCESS,

  PRI_DOM_PRICING_DELETE_ITEM,
  PRI_DOM_PRICING_DELETE_ITEM_SUCCESS,
  
  PRI_DOM_PRICING_GET_DATA,
  PRI_DOM_PRICING_GET_DATA_SUCCESS,
  
  PRI_DOM_PRICING_ADD_RANGE_WEIGHT_VALUE,
  PRI_DOM_PRICING_ADD_RANGE_WEIGHT_VALUE_SUCCESS,

} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loading: true,
  items: [],
  itemEditting: {},
  total: 0,
  paramSearch: null,
  data: {},
  loadingData: true
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRI_DOM_PRICING_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case PRI_DOM_PRICING_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case PRI_DOM_PRICING_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case PRI_DOM_PRICING_REQUEST_UPDATE_ITEM:
      return { 
        ...state, 
        loading: true 
      };

    case PRI_DOM_PRICING_REQUEST_UPDATE_ITEM_SUCCESS:
      return { 
        ...state, 
        loading: false,
        itemEditting: action.payload 
      };

    case PRI_DOM_PRICING_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_DOM_PRICING_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

    case PRI_DOM_PRICING_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_DOM_PRICING_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };
      
    case PRI_DOM_PRICING_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_DOM_PRICING_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

    case PRI_DOM_PRICING_GET_DATA:
      return {
        ...state,
        loadingData: true,
      };

    case PRI_DOM_PRICING_GET_DATA_SUCCESS:
      return { 
        ...state, 
        loadingData: false, 
        data: action.payload
      };

    case PRI_DOM_PRICING_ADD_RANGE_WEIGHT_VALUE:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_DOM_PRICING_ADD_RANGE_WEIGHT_VALUE_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

    default:
      return { ...state };
  }
}
