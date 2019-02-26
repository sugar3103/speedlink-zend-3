import {
  BRANCH_TOGGLE_MODAL,
  BRANCH_GET_LIST,
  BRANCH_GET_LIST_SUCCESS,
  BRANCH_GET_LIST_ERROR,
  BRANCH_ADD_ITEM,
  BRANCH_ADD_ITEM_SUCCESS,
  BRANCH_ADD_ITEM_ERROR,
  BRANCH_UPDATE_ITEM,
  BRANCH_UPDATE_ITEM_SUCCESS,
  BRANCH_UPDATE_ITEM_ERROR,
  BRANCH_DELETE_ITEM,
  BRANCH_DELETE_ITEM_SUCCESS,
  BRANCH_DELETE_ITEM_ERROR,
  BRANCH_CHANGE_TYPE_MODAL,
  BRANCH_COUNTRY_GET_LIST,
  BRANCH_COUNTRY_GET_LIST_SUCCESS,
  BRANCH_COUNTRY_GET_LIST_ERROR,
  BRANCH_CITY_GET_LIST,
  BRANCH_CITY_GET_LIST_SUCCESS,
  BRANCH_CITY_GET_LIST_ERROR,
  BRANCH_DISTRICT_GET_LIST,
  BRANCH_DISTRICT_GET_LIST_SUCCESS,
  BRANCH_DISTRICT_GET_LIST_ERROR,
  BRANCH_WARD_GET_LIST,
  BRANCH_WARD_GET_LIST_SUCCESS,
  BRANCH_WARD_GET_LIST_ERROR,
} from '../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
  total: 0,
  errors: null,
  loading: true,
  modalOpen: false,
  modalType: null,
  modalData: null,
  paramSearch: null,
  countries:null,
  cities:null,
  districts:null,
  wards:null,
};

export default (state = INIT_STATE, action) => {
  let types,params = null;

  switch (action.type) {

    case BRANCH_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }
    
    case BRANCH_CHANGE_TYPE_MODAL:
			return { 
        ...state, 
        modalType: action.payload
      };

    case BRANCH_GET_LIST:
       params  = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case BRANCH_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case BRANCH_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case BRANCH_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case BRANCH_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case BRANCH_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case BRANCH_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case BRANCH_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case BRANCH_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case BRANCH_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case BRANCH_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

		case BRANCH_DELETE_ITEM_ERROR:
			return { 
        ...state, 
        errors: action.payload 
      };
    
      case BRANCH_COUNTRY_GET_LIST:
      params = action.payload.params;
      return { 
        ...state, 
      };
    
      case BRANCH_COUNTRY_GET_LIST_SUCCESS:
        const { countries } = action.payload;
        return { 
          ...state, 
          countries
        };
    
      case BRANCH_COUNTRY_GET_LIST_ERROR:
        return { 
          ...state, 
          errors: action.payload 
        };
    
        case BRANCH_CITY_GET_LIST:
        params = action.payload.params;
        return { 
          ...state, 
        };
    
      case BRANCH_CITY_GET_LIST_SUCCESS:
        const { cities } = action.payload;
        types = action.payload.types;
        if(types ==='onchange')
          return {
            ...state, 
            cities,
            districts: null,
            wards: null
          }
        else
        return { 
          ...state, 
          cities
        };
    
      case BRANCH_CITY_GET_LIST_ERROR:
        return { 
          ...state, 
          errors: action.payload 
        };
    
        case BRANCH_DISTRICT_GET_LIST:
        params = action.payload.params;
        return { 
          ...state, 
        };
    
      case BRANCH_DISTRICT_GET_LIST_SUCCESS:
        const { districts } = action.payload;
        types = action.payload.types;
        if(types ==='onchange')
          return { 
            ...state, 
            districts,
            wards: null
          };
        else
          return{
            ...state, 
            districts
          };
    
      case BRANCH_DISTRICT_GET_LIST_ERROR:
        return { 
          ...state, 
          errors: action.payload 
        };
    
        case BRANCH_WARD_GET_LIST:
        params = action.payload.params;
        return { 
          ...state, 
        };
    
      case BRANCH_WARD_GET_LIST_SUCCESS:
        const { wards } = action.payload;
        types = action.payload.types;
        return { 
          ...state, 
          wards
        };
    
      case BRANCH_WARD_GET_LIST_ERROR:
        return { 
          ...state, 
          errors: action.payload 
        };

    default: 
      return { ...state };
  }
}
