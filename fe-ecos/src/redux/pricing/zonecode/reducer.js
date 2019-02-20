import {
  ZONECODE_TOGGLE_MODAL,
  ZONECODE_GET_LIST,
  ZONECODE_GET_LIST_SUCCESS,
  ZONECODE_GET_LIST_ERROR,
  ZONECODE_ADD_ITEM,
  ZONECODE_ADD_ITEM_SUCCESS,
  ZONECODE_ADD_ITEM_ERROR,
  ZONECODE_UPDATE_ITEM,
  ZONECODE_UPDATE_ITEM_SUCCESS,
  ZONECODE_UPDATE_ITEM_ERROR,
  ZONECODE_DELETE_ITEM,
  ZONECODE_DELETE_ITEM_SUCCESS,
  ZONECODE_DELETE_ITEM_ERROR,

  ORIGIN_COUNTRY_GET_LIST,
  ORIGIN_COUNTRY_GET_LIST_SUCCESS,
  ORIGIN_COUNTRY_GET_LIST_ERROR,
  ORIGIN_CITY_GET_LIST,
  ORIGIN_CITY_GET_LIST_SUCCESS,
  ORIGIN_CITY_GET_LIST_ERROR,
  ORIGIN_DISTRICT_GET_LIST,
  ORIGIN_DISTRICT_GET_LIST_SUCCESS,
  ORIGIN_DISTRICT_GET_LIST_ERROR,
  ORIGIN_WARD_GET_LIST,
  ORIGIN_WARD_GET_LIST_SUCCESS,
  ORIGIN_WARD_GET_LIST_ERROR,

  DESTINATION_COUNTRY_GET_LIST,
  DESTINATION_COUNTRY_GET_LIST_SUCCESS,
  DESTINATION_COUNTRY_GET_LIST_ERROR,
  DESTINATION_CITY_GET_LIST,
  DESTINATION_CITY_GET_LIST_SUCCESS,
  DESTINATION_CITY_GET_LIST_ERROR,
  DESTINATION_DISTRICT_GET_LIST,
  DESTINATION_DISTRICT_GET_LIST_SUCCESS,
  DESTINATION_DISTRICT_GET_LIST_ERROR,
  DESTINATION_WARD_GET_LIST,
  DESTINATION_WARD_GET_LIST_SUCCESS,
  DESTINATION_WARD_GET_LIST_ERROR
} from '../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
  total: 0,
  errors: null,
  loading: true,
  modalOpen: false,
  modalData: null,
  paramSearch: null,
  origin_country:null,
  origin_city:null,
  origin_district:null,
  origin_ward:null,
  destination_country:null,
  destination_city:null,
  destination_district:null,
  destination_ward:null
};

export default (state = INIT_STATE, action) => {
  let params= null;
  switch (action.type) {

    case ZONECODE_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload,
        errors: null
      }

    case ZONECODE_GET_LIST:
      params = action.payload.params;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case ZONECODE_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case ZONECODE_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case ZONECODE_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case ZONECODE_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case ZONECODE_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case ZONECODE_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case ZONECODE_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case ZONECODE_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case ZONECODE_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case ZONECODE_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

		case ZONECODE_DELETE_ITEM_ERROR:
			return { 
        ...state, 
        errors: action.payload 
      };

  case ORIGIN_COUNTRY_GET_LIST:
  params = action.payload.params;
  return { 
    ...state, 
    loading: true,
    paramSearch: (params && params.query) ? params.query : null
  };

  case ORIGIN_COUNTRY_GET_LIST_SUCCESS:
    const { origin_country } = action.payload;
    return { 
      ...state, 
      loading: false, 
      origin_country
    };

  case ORIGIN_COUNTRY_GET_LIST_ERROR:
    return { 
      ...state, 
      loading: false, 
      errors: action.payload 
    };

    case ORIGIN_CITY_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
      loading: true,
      paramSearch: (params && params.query) ? params.query : null
    };

  case ORIGIN_CITY_GET_LIST_SUCCESS:
    const { origin_city } = action.payload;
    return { 
      ...state, 
      loading: false, 
      origin_city
    };

  case ORIGIN_CITY_GET_LIST_ERROR:
    return { 
      ...state, 
      loading: false, 
      errors: action.payload 
    };

    case ORIGIN_DISTRICT_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
      loading: true,
      paramSearch: (params && params.query) ? params.query : null
    };

  case ORIGIN_DISTRICT_GET_LIST_SUCCESS:
    const { origin_district } = action.payload;
    return { 
      ...state, 
      loading: false, 
      origin_district
    };

  case ORIGIN_DISTRICT_GET_LIST_ERROR:
    return { 
      ...state, 
      loading: false, 
      errors: action.payload 
    };

    case ORIGIN_WARD_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
      loading: true,
      paramSearch: (params && params.query) ? params.query : null
    };

  case ORIGIN_WARD_GET_LIST_SUCCESS:
    const { origin_ward } = action.payload;
    return { 
      ...state, 
      loading: false, 
      origin_ward
    };

  case ORIGIN_WARD_GET_LIST_ERROR:
    return { 
      ...state, 
      loading: false, 
      errors: action.payload 
    };

    case DESTINATION_COUNTRY_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
      loading: true,
      paramSearch: (params && params.query) ? params.query : null
    };

  case DESTINATION_COUNTRY_GET_LIST_SUCCESS:
    const { destination_country } = action.payload;
    return { 
      ...state, 
      loading: false, 
      destination_country
    };

  case DESTINATION_COUNTRY_GET_LIST_ERROR:
    return { 
      ...state, 
      loading: false, 
      errors: action.payload 
    };

    case DESTINATION_CITY_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
      loading: true,
      paramSearch: (params && params.query) ? params.query : null
    };

  case DESTINATION_CITY_GET_LIST_SUCCESS:
    const { destination_city } = action.payload;
    return { 
      ...state, 
      loading: false, 
      destination_city
    };

  case DESTINATION_CITY_GET_LIST_ERROR:
    return { 
      ...state, 
      loading: false, 
      errors: action.payload 
    };

    case DESTINATION_DISTRICT_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
      loading: true,
      paramSearch: (params && params.query) ? params.query : null
    };

  case DESTINATION_DISTRICT_GET_LIST_SUCCESS:
    const { destination_district } = action.payload;
    return { 
      ...state, 
      loading: false, 
      destination_district
    };

  case DESTINATION_DISTRICT_GET_LIST_ERROR:
    return { 
      ...state, 
      loading: false, 
      errors: action.payload 
    };

    case DESTINATION_WARD_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
      loading: true,
      paramSearch: (params && params.query) ? params.query : null
    };

  case DESTINATION_WARD_GET_LIST_SUCCESS:
    const { destination_ward } = action.payload;
    return { 
      ...state, 
      loading: false, 
      destination_ward
    };

  case DESTINATION_WARD_GET_LIST_ERROR:
    return { 
      ...state, 
      loading: false, 
      errors: action.payload 
    };

    default: 
      return { ...state };
  }
}
