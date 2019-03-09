import {
  PRICING_ERROR,

  PRICING_CUSTOMER_GET_LIST,
  PRICING_CUSTOMER_GET_LIST_SUCCESS,
 
  PRICING_SALEMAN_GET_LIST,
  PRICING_SALEMAN_GET_LIST_SUCCESS,

  PRICING_CARRIER_GET_LIST,
  PRICING_CARRIER_GET_LIST_SUCCESS,

  PRICING_GET_LIST,
  PRICING_GET_LIST_SUCCESS,
  
  PRICING_ADD_MASTER_DATA,
  PRICING_ADD_MASTER_DATA_SUCCESS,

  PRICING_GET_DATA,
  PRICING_GET_DATA_SUCCESS,

  PRICING_UPDATE_DATA,
  PRICING_UPDATE_DATA_SUCCESS,

} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loading: true,
  items: null,
  customers: null,
  salemans: null,
  carriers: null,
  total: 0,
  paramSearch: null,
  data: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRICING_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
    };

    case PRICING_CUSTOMER_GET_LIST:
      return { 
        ...state, 
        loading: false,
      };

    case PRICING_CUSTOMER_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        customers: action.payload
      };

    case PRICING_SALEMAN_GET_LIST:
      return { 
        ...state, 
        loading: false,
      };

    case PRICING_SALEMAN_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        salemans: action.payload
      };

    case PRICING_CARRIER_GET_LIST:
      return { 
        ...state, 
        loading: false,
      };

    case PRICING_CARRIER_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        carriers: action.payload
      };

    case PRICING_GET_LIST:
      const { params } = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case PRICING_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case PRICING_ADD_MASTER_DATA:
			return { 
        ...state, 
        loading: false 
      };

		case PRICING_ADD_MASTER_DATA_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

    case PRICING_GET_DATA:
			return { 
        ...state, 
        loading: false 
      };

    case PRICING_GET_DATA_SUCCESS:
			return { 
        ...state, 
        loading: false,
        data: action.payload
      };

    case PRICING_UPDATE_DATA:
			return { 
        ...state, 
        loading: false 
      };

		case PRICING_UPDATE_DATA_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

    default:
      return { ...state };
  }
}
