import {
  ADDRESS_GET_LIST,
  ADDRESS_GET_LIST_SUCCESS,
  ADDRESS_GET_LIST_ERROR,

  COUNTRY_GET_LIST,
  COUNTRY_GET_LIST_SUCCESS,
  COUNTRY_GET_LIST_ERROR,
  COUNTRY_ADD_ITEM,
  COUNTRY_ADD_ITEM_SUCCESS,
  COUNTRY_ADD_ITEM_ERROR,
  COUNTRY_UPDATE_ITEM,
  COUNTRY_UPDATE_ITEM_SUCCESS,
  COUNTRY_UPDATE_ITEM_ERROR,

  CITY_GET_LIST,
  CITY_GET_LIST_SUCCESS,
  CITY_GET_LIST_ERROR,
  
  DISTRICT_GET_LIST,
  DISTRICT_GET_LIST_SUCCESS,
  DISTRICT_GET_LIST_ERROR,

  WARD_GET_LIST,
  WARD_GET_LIST_SUCCESS,
  WARD_GET_LIST_ERROR,
  COUNTRY_TOGGLE_MODAL,
} from '../../../constants/actionTypes';

const INIT_STATE = {
  
  items: null,
  error: null,
  loading: true,
  paramSearch: null,
  modalCountryOpen: false,
  modalCountryData: null
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

    case COUNTRY_TOGGLE_MODAL:
      return {
        ...state,
        modalCountryOpen: !state.modalCountryOpen,
        modalCountryData: action.payload,
        error: null
      }

    case COUNTRY_GET_LIST:      
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case COUNTRY_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        items: action.payload 
      };

    case COUNTRY_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case COUNTRY_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case COUNTRY_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        error: null
      };

		case COUNTRY_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case COUNTRY_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case COUNTRY_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        error: null
      };

		case COUNTRY_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case CITY_GET_LIST:      
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case CITY_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        items: action.payload 
      };

    case CITY_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    
    case DISTRICT_GET_LIST:      
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case DISTRICT_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        items: action.payload 
      };

    case DISTRICT_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

      case WARD_GET_LIST:      
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case WARD_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        items: action.payload 
      };

    case WARD_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    default: 
      return { ...state };
  }
}
