import {
  PRI_SPECIAL_PRICING_ERROR,

  PRI_SPECIAL_PRICING_GET_LIST,
  PRI_SPECIAL_PRICING_GET_LIST_SUCCESS,

  PRI_SPECIAL_PRICING_ADD_ITEM,
  PRI_SPECIAL_PRICING_ADD_ITEM_SUCCESS,

  PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM,
  PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_PRICING_UPDATE_ITEM,
  PRI_SPECIAL_PRICING_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_PRICING_DELETE_ITEM,
  PRI_SPECIAL_PRICING_DELETE_ITEM_SUCCESS,
  
  PRI_SPECIAL_PRICING_GET_DATA,
  PRI_SPECIAL_PRICING_GET_DATA_SUCCESS,
  
  PRI_SPECIAL_PRICING_ADD_RANGE_WEIGHT_VALUE,
  PRI_SPECIAL_PRICING_ADD_RANGE_WEIGHT_VALUE_SUCCESS,

  PRI_SPECIAL_PRICING_GET_VAS,
  PRI_SPECIAL_PRICING_GET_VAS_SUCCESS,

  PRI_SPECIAL_PRICING_UPDATE_VAS,
  PRI_SPECIAL_PRICING_UPDATE_VAS_SUCCESS,

  PRI_SPECIAL_PRICING_GET_FIELD_VAS,
  PRI_SPECIAL_PRICING_GET_FIELD_VAS_SUCCESS,

} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loading: true,
  items: [],
  itemEditting: {},
  total: 0,
  paramSearch: null,
  data: {},
  loadingData: true,
  loadingVas: true,
  vas: [],
  loadingFieldVas: true,
  fieldVas: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRI_SPECIAL_PRICING_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case PRI_SPECIAL_PRICING_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case PRI_SPECIAL_PRICING_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM:
      return { 
        ...state, 
        loading: true 
      };

    case PRI_SPECIAL_PRICING_REQUEST_UPDATE_ITEM_SUCCESS:
      return { 
        ...state, 
        loading: false,
        itemEditting: action.payload 
      };

    case PRI_SPECIAL_PRICING_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_SPECIAL_PRICING_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

    case PRI_SPECIAL_PRICING_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_SPECIAL_PRICING_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };
      
    case PRI_SPECIAL_PRICING_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_SPECIAL_PRICING_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

    case PRI_SPECIAL_PRICING_GET_DATA:
      return {
        ...state,
        loadingData: true,
      };

    case PRI_SPECIAL_PRICING_GET_DATA_SUCCESS:
      return { 
        ...state, 
        loadingData: false, 
        data: action.payload
      };

    case PRI_SPECIAL_PRICING_ADD_RANGE_WEIGHT_VALUE:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_SPECIAL_PRICING_ADD_RANGE_WEIGHT_VALUE_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

    case PRI_SPECIAL_PRICING_UPDATE_VAS:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_SPECIAL_PRICING_UPDATE_VAS_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

    case PRI_SPECIAL_PRICING_GET_VAS:
      return {
        ...state,
        loadingVas: true,
      };

    case PRI_SPECIAL_PRICING_GET_VAS_SUCCESS:
      return { 
        ...state, 
        loadingVas: false, 
        vas: action.payload
      };

    case PRI_SPECIAL_PRICING_GET_FIELD_VAS:
      return {
        ...state,
        loadingFieldVas: true,
      };

    case PRI_SPECIAL_PRICING_GET_FIELD_VAS_SUCCESS:
      return { 
        ...state, 
        loadingFieldVas: false, 
        fieldVas: action.payload
      };

    default:
      return { ...state };
  }
}
