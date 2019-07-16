import {
  PRI_INT_WARD_ERROR,

  PRI_INT_ORIGIN_WARD_GET_LIST,
  PRI_INT_ORIGIN_WARD_GET_LIST_SUCCESS,
  PRI_INT_ORIGIN_WARD_RESET_STATE,

  PRI_INT_DESTINATION_WARD_GET_LIST,
  PRI_INT_DESTINATION_WARD_GET_LIST_SUCCESS,
  PRI_INT_DESTINATION_WARD_RESET_STATE,

  PRI_INT_PRICING_WARD_GET_LIST,
  PRI_INT_PRICING_WARD_GET_LIST_SUCCESS,
  PRI_INT_PRICING_WARD_RESET_STATE,

} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loadingOrigin: true,
  loadingDestination: true,
  loadingPricing: true,
  origin: [],
  destination: [],
  pricing: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRI_INT_WARD_ERROR:
      return {
        ...state,
        loadingOrigin: false,
        loadingDestination: false,
        errors: action.payload
      };

    case PRI_INT_ORIGIN_WARD_GET_LIST:
      return {
        ...state,
        loadingOrigin: true
      };

    case PRI_INT_ORIGIN_WARD_GET_LIST_SUCCESS:
      const { origin } = action.payload;
      return { 
        ...state, 
        loadingOrigin: false, 
        origin
      };

    case PRI_INT_ORIGIN_WARD_RESET_STATE:
      return { 
        ...state, 
        loadingDestination: false, 
        origin: []
      };

    case PRI_INT_DESTINATION_WARD_GET_LIST:
      return {
        ...state,
        loadingDestination: true
      };

    case PRI_INT_DESTINATION_WARD_GET_LIST_SUCCESS:
      const { destination } = action.payload;
      return { 
        ...state, 
        loadingDestination: false, 
        destination
      };

    case PRI_INT_DESTINATION_WARD_RESET_STATE:
      return { 
        ...state, 
        loadingDestination: false, 
        destination: []
      };

    case PRI_INT_PRICING_WARD_GET_LIST:
      return {
        ...state,
        loadingPricing: true
      };

    case PRI_INT_PRICING_WARD_GET_LIST_SUCCESS:
      const { pricing } = action.payload;
      return { 
        ...state, 
        loadingPricing: false, 
        pricing
      };

    case PRI_INT_PRICING_WARD_RESET_STATE:
      return { 
        ...state, 
        loadingPricing: false, 
        pricing: []
      };
      
    default:
      return { ...state };
  }
}
