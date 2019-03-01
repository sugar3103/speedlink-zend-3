import {
  PRICING_COUNTRY_GET_LIST,
  PRICING_COUNTRY_GET_LIST_SUCCESS,
  PRICING_COUNTRY_GET_LIST_ERROR,

  PRICING_CITY_GET_LIST,
  PRICING_CITY_GET_LIST_SUCCESS,
  PRICING_CITY_GET_LIST_ERROR,

  PRICING_DISTRICT_GET_LIST,
  PRICING_DISTRICT_GET_LIST_SUCCESS,
  PRICING_DISTRICT_GET_LIST_ERROR,

  PRICING_WARD_GET_LIST,
  PRICING_WARD_GET_LIST_SUCCESS,
  PRICING_WARD_GET_LIST_ERROR,

  PRICING_SALEMAN_GET_LIST,
  PRICING_SALEMAN_GET_LIST_SUCCESS,
  PRICING_SALEMAN_GET_LIST_ERROR,

  PRICING_APPROVED_BY_GET_LIST,
  PRICING_APPROVED_BY_GET_LIST_SUCCESS,
  PRICING_APPROVED_BY_GET_LIST_ERROR,

  PRICING_GET_LIST,
  PRICING_GET_LIST_SUCCESS,
  PRICING_GET_LIST_ERROR,
  
  PRICING_ADD_MASTER_DATA,
  PRICING_ADD_MASTER_DATA_SUCCESS,
  PRICING_ADD_MASTER_DATA_ERROR,
} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loading: true,
  countries: null,
  cities: null,
  districts: null,
  wards: null,
  salemans: null,
  approvedBys: null,
  items: null,
  total: 0,
  paramSearch: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case PRICING_COUNTRY_GET_LIST:
      return {
        ...state,
      };

    case PRICING_COUNTRY_GET_LIST_SUCCESS:
      const { countries } = action.payload;
      return {
        ...state,
        countries
      };

    case PRICING_COUNTRY_GET_LIST_ERROR:
      return {
        ...state,
        errors: action.payload
      };

    case PRICING_CITY_GET_LIST:
      return {
        ...state,
      };

    case PRICING_CITY_GET_LIST_SUCCESS:
      const { cities } = action.payload;
      return {
        ...state,
        cities,
        districts: null,
        wards: null
      };

    case PRICING_CITY_GET_LIST_ERROR:
      return {
        ...state,
        errors: action.payload
      };

    case PRICING_DISTRICT_GET_LIST:
      return {
        ...state,
      };

    case PRICING_DISTRICT_GET_LIST_SUCCESS:
      const { districts } = action.payload;
      return {
        ...state,
        districts,
        wards: null
      };

    case PRICING_DISTRICT_GET_LIST_ERROR:
      return {
        ...state,
        errors: action.payload
      };

    case PRICING_WARD_GET_LIST:
      return {
        ...state,
      };

    case PRICING_WARD_GET_LIST_SUCCESS:
      const { wards } = action.payload;
      
      return {
        ...state,
        wards
      };

    case PRICING_WARD_GET_LIST_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case PRICING_SALEMAN_GET_LIST:
      return {
        ...state,
      };

    case PRICING_SALEMAN_GET_LIST_SUCCESS:
      const { salemans } = action.payload;
      
      return {
        ...state,
        salemans
      };

    case PRICING_SALEMAN_GET_LIST_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case PRICING_APPROVED_BY_GET_LIST:
      return {
        ...state,
      };

    case PRICING_APPROVED_BY_GET_LIST_SUCCESS:
      const { approvedBys } = action.payload;
      
      return {
        ...state,
        approvedBys
      };

    case PRICING_APPROVED_BY_GET_LIST_ERROR:
      return {
        ...state,
        errors: action.payload
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

    case PRICING_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        errors: action.payload 
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

		case PRICING_ADD_MASTER_DATA_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    default:
      return { ...state };
  }
}
