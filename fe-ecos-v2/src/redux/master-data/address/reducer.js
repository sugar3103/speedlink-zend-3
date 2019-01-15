import {
  ADDRESS_GET_LIST,
  ADDRESS_GET_LIST_SUCCESS,
  ADDRESS_GET_LIST_ERROR,

  COUNTRY_TOGGLE_MODAL,
  COUNTRY_GET_LIST,
  COUNTRY_GET_LIST_SUCCESS,
  COUNTRY_GET_LIST_ERROR,
  COUNTRY_ADD_ITEM,
  COUNTRY_ADD_ITEM_SUCCESS,
  COUNTRY_ADD_ITEM_ERROR,
  COUNTRY_UPDATE_ITEM,
  COUNTRY_UPDATE_ITEM_SUCCESS,
  COUNTRY_UPDATE_ITEM_ERROR,

  CITY_TOGGLE_MODAL,
  CITY_GET_LIST,
  CITY_GET_LIST_SUCCESS,
  CITY_GET_LIST_ERROR,
  CITY_ADD_ITEM,
  CITY_ADD_ITEM_SUCCESS,
  CITY_ADD_ITEM_ERROR,
  CITY_UPDATE_ITEM,
  CITY_UPDATE_ITEM_SUCCESS,
  CITY_UPDATE_ITEM_ERROR,
  
  DISTRICT_GET_LIST,
  DISTRICT_GET_LIST_SUCCESS,
  DISTRICT_GET_LIST_ERROR,

  WARD_GET_LIST,
  WARD_GET_LIST_SUCCESS,
  WARD_GET_LIST_ERROR,
} from '../../../constants/actionTypes';

const INIT_STATE = {
  codes: {
    items: null,
    loading: true,
    paramSearch: null,
    error: null
  },
  countries: {
    items: null,
    loading: true,
    paramSearch: null,
    error: null,
    modalOpen: false,
    modalData: null
  },
  cities: {
    items: null,
    loading: true,
    paramSearch: null,
    error: null,
    modalOpen: false,
    modalData: null
  },
  districts: {
    items: null,
    loading: true,
    paramSearch: null,
    error: null,
    modalOpen: false,
    modalData: null
  },
  wards: {
    items: null,
    loading: true,
    paramSearch: null,
    error: null,
    modalOpen: false,
    modalData: null
  }
};

export default (state = INIT_STATE, action) => {
  
  switch (action.type) {
    case ADDRESS_GET_LIST:
      return { 
        ...state, 
        codes: {
          ...state.codes,
          loading: true,
          paramSearch: (action.payload.params && action.payload.params.query) ? action.payload.params.query : null
        }
      };

    case ADDRESS_GET_LIST_SUCCESS:
      return { 
        ...state, 
        codes: {
          ...state.codes,
          loading: false,
          items: action.payload 
        }
      };

    case ADDRESS_GET_LIST_ERROR:
      return { 
        ...state, 
        codes: {
          ...state.codes,
          loading: false, 
          error: action.payload 
        }
      };

    case COUNTRY_TOGGLE_MODAL:
      return {
        ...state,
        codes: {
          ...state.codes,
          modalOpen: !state.codes.modalOpen,
          modalData: action.payload,
          error: null
        }
      }

    case COUNTRY_GET_LIST:  
      return { 
        ...state, 
        countries: {
          ...state.countries,
          loading: true,
          paramSearch: (action.payload.params && action.payload.params.query) ? action.payload.params.query : null
        }
      };

    case COUNTRY_GET_LIST_SUCCESS:
      return { 
        ...state, 
        countries: {
          ...state.countries,
          loading: false, 
          items: action.payload 
        }
      };

    case COUNTRY_GET_LIST_ERROR:
      return { 
        ...state, 
        countries: {
          ...state.countries,
          loading: false, 
          error: action.payload 
        }
      };

    case COUNTRY_ADD_ITEM:
			return { 
        ...state, 
        countries: {
          ...state.countries,
          loading: false 
        }
      };

		case COUNTRY_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        countries: {
          ...state.countries,
          loading: false, 
          error: null
        }
      };

		case COUNTRY_ADD_ITEM_ERROR:
			return { 
        ...state, 
        countries: {
          ...state.countries,
          loading: false, 
          error: action.payload 
        }
      };

    case COUNTRY_UPDATE_ITEM:
			return { 
        ...state, 
        countries: {
          ...state.countries,
          loading: false
        }
      };

		case COUNTRY_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        countries: {
          ...state.countries,
          loading: false, 
          error: null
        }
      };

		case COUNTRY_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        countries: {
          ...state.countries,
          loading: false, 
          error: action.payload 
        }
      };

    case CITY_TOGGLE_MODAL:
      return {
        ...state,
        cities: {
          ...state.cities,
          modalOpen: !state.cities.modalOpen,
          modalData: action.payload,
          error: null
        }
      }

    case CITY_GET_LIST:      
      return { 
        ...state, 
        cities: {
          ...state.cities,
          loading: true,
          paramSearch: (action.payload.params && action.payload.params.query) ? action.payload.params.query : null
        }
      };

    case CITY_GET_LIST_SUCCESS:
      return { 
        ...state, 
        cities: {
          ...state.cities,
          loading: false, 
          items: action.payload 
        }
      };

    case CITY_GET_LIST_ERROR:
      return { 
        ...state, 
        cities: {
          ...state.cities,
          loading: false, 
          error: action.payload 
        }
      };

    case CITY_ADD_ITEM:
			return { 
        ...state, 
        cities: {
          ...state.cities,
          loading: false 
        }
      };

		case CITY_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        cities: {
          ...state.cities,
          loading: false, 
          error: null
        }
      };

		case CITY_ADD_ITEM_ERROR:
			return { 
        ...state, 
        cities: {
          ...state.cities,
          loading: false, 
          error: action.payload 
        }
      };

    case CITY_UPDATE_ITEM:
			return { 
        ...state, 
        cities: {
          ...state.cities,
          loading: false 
        }
      };

		case CITY_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        cities: {
          ...state.cities,
          loading: false, 
          error: null
        }
      };

		case CITY_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        cities: {
          ...state.cities,
          loading: false, 
          error: action.payload 
        }
      };
    
    case DISTRICT_GET_LIST:      
      return { 
        ...state, 
        districts: {
          ...state.districts,
          loading: true,
          paramSearch: (action.payload.params && action.payload.params.query) ? action.payload.params.query : null
        }
      };

    case DISTRICT_GET_LIST_SUCCESS:
      return { 
        ...state, 
        districts: {
          ...state.districts,
          loading: false, 
          items: action.payload 
        }
      };

    case DISTRICT_GET_LIST_ERROR:
      return { 
        ...state, 
        districts: {
          ...state.districts,
          loading: false, 
          error: action.payload 
        }
      };

    case WARD_GET_LIST:      
      return { 
        ...state, 
        wards: {
          ...state.wards,
          loading: true,
          paramSearch: (action.payload.params && action.payload.params.query) ? action.payload.params.query : null
        }
      };

    case WARD_GET_LIST_SUCCESS:
      return { 
        ...state, 
        wards: {
          ...state.wards,
          loading: false, 
          items: action.payload 
        }
      };

    case WARD_GET_LIST_ERROR:
      return { 
        ...state, 
        wards: {
          ...state.wards,
          loading: false, 
          error: action.payload 
        }
      };

    default: 
      return { ...state };
  }
}
