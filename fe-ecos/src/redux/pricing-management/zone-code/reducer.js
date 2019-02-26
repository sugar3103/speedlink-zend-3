import {
  ZONE_CODE_TOGGLE_MODAL,
  ZONE_CODE_GET_LIST,
  ZONE_CODE_GET_LIST_SUCCESS,
  ZONE_CODE_GET_LIST_ERROR,
  ZONE_CODE_ADD_ITEM,
  ZONE_CODE_ADD_ITEM_SUCCESS,
  ZONE_CODE_ADD_ITEM_ERROR,
  ZONE_CODE_UPDATE_ITEM,
  ZONE_CODE_UPDATE_ITEM_SUCCESS,
  ZONE_CODE_UPDATE_ITEM_ERROR,
  ZONE_CODE_DELETE_ITEM,
  ZONE_CODE_DELETE_ITEM_SUCCESS,
  ZONE_CODE_DELETE_ITEM_ERROR,
  ZONE_CODE_CHANGE_TYPE_MODAL,

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
  modalType: null,
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
  let types = null;
  switch (action.type) {

    case ZONE_CODE_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }

    case ZONE_CODE_CHANGE_TYPE_MODAL:
			return { 
        ...state, 
        modalType: action.payload
      };

    case ZONE_CODE_GET_LIST:
      params = action.payload.params;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case ZONE_CODE_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case ZONE_CODE_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case ZONE_CODE_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case ZONE_CODE_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case ZONE_CODE_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case ZONE_CODE_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case ZONE_CODE_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case ZONE_CODE_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case ZONE_CODE_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case ZONE_CODE_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

		case ZONE_CODE_DELETE_ITEM_ERROR:
			return { 
        ...state, 
        errors: action.payload 
      };

  case ORIGIN_COUNTRY_GET_LIST:
  params = action.payload.params;
  return { 
    ...state, 
  };

  case ORIGIN_COUNTRY_GET_LIST_SUCCESS:
    const { origin_country } = action.payload;
    return { 
      ...state, 
      origin_country
    };

  case ORIGIN_COUNTRY_GET_LIST_ERROR:
    return { 
      ...state, 
      errors: action.payload 
    };

    case ORIGIN_CITY_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
    };

  case ORIGIN_CITY_GET_LIST_SUCCESS:
    const { origin_city } = action.payload;
    types = action.payload.types;
    return { 
      ...state, 
      origin_city,
      origin_district: types ==='onchange' ? null : '',
      origin_ward: types ==='onchange' ? null : '' 
    };

  case ORIGIN_CITY_GET_LIST_ERROR:
    return { 
      ...state, 
      errors: action.payload 
    };

    case ORIGIN_DISTRICT_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
    };

  case ORIGIN_DISTRICT_GET_LIST_SUCCESS:
    const { origin_district } = action.payload;
    types = action.payload.types;
    return { 
      ...state, 
      origin_district,
      origin_ward: types ==='onchange' ? null : ''
    };

  case ORIGIN_DISTRICT_GET_LIST_ERROR:
    return { 
      ...state, 
      errors: action.payload 
    };

    case ORIGIN_WARD_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
    };

  case ORIGIN_WARD_GET_LIST_SUCCESS:
    const { origin_ward } = action.payload;
    types = action.payload.types;
    return { 
      ...state, 
      origin_ward
    };

  case ORIGIN_WARD_GET_LIST_ERROR:
    return { 
      ...state, 
      errors: action.payload 
    };

    case DESTINATION_COUNTRY_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
    };

  case DESTINATION_COUNTRY_GET_LIST_SUCCESS:
    const { destination_country } = action.payload;
    return { 
      ...state, 
      destination_country
      
    };

  case DESTINATION_COUNTRY_GET_LIST_ERROR:
    return { 
      ...state, 
      errors: action.payload 
    };

    case DESTINATION_CITY_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
    };

  case DESTINATION_CITY_GET_LIST_SUCCESS:
    const { destination_city } = action.payload;
    return { 
      ...state, 
      destination_city,
      destination_district:null,
      destination_ward:null
    };

  case DESTINATION_CITY_GET_LIST_ERROR:
    return { 
      ...state, 
      errors: action.payload 
    };

    case DESTINATION_DISTRICT_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
    };

  case DESTINATION_DISTRICT_GET_LIST_SUCCESS:
    const { destination_district } = action.payload;
    return { 
      ...state, 
      destination_district,
      destination_ward:null
    };

  case DESTINATION_DISTRICT_GET_LIST_ERROR:
    return { 
      ...state, 
      errors: action.payload 
    };

    case DESTINATION_WARD_GET_LIST:
    params = action.payload.params;
    return { 
      ...state, 
    };

  case DESTINATION_WARD_GET_LIST_SUCCESS:
    const { destination_ward } = action.payload;
    return { 
      ...state, 
      destination_ward
    };

  case DESTINATION_WARD_GET_LIST_ERROR:
    return { 
      ...state, 
      errors: action.payload 
    };

    default: 
      return { ...state };
  }
}
