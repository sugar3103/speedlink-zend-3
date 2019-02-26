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
} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loading: true,
  countries: null,
  cities: null,
  districts: null,
  wards: null,
  salemans: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case PRICING_COUNTRY_GET_LIST:
      return {
        ...state,
        loading: true,
      };

    case PRICING_COUNTRY_GET_LIST_SUCCESS:
      const { countries } = action.payload;
      return {
        ...state,
        loading: false,
        countries
      };

    case PRICING_COUNTRY_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case PRICING_CITY_GET_LIST:
      return {
        ...state,
        loading: true,
      };

    case PRICING_CITY_GET_LIST_SUCCESS:
      const { cities } = action.payload;
      return {
        ...state,
        loading: false,
        cities,
        districts: null,
        wards: null
      };

    case PRICING_CITY_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case PRICING_DISTRICT_GET_LIST:
      return {
        ...state,
        loading: true,
      };

    case PRICING_DISTRICT_GET_LIST_SUCCESS:
      const { districts } = action.payload;
      return {
        ...state,
        loading: false,
        districts,
        wards: null
      };

    case PRICING_DISTRICT_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case PRICING_WARD_GET_LIST:
      return {
        ...state,
        loading: true,
      };

    case PRICING_WARD_GET_LIST_SUCCESS:
      const { wards } = action.payload;
      
      return {
        ...state,
        loading: false,
        wards
      };

    case PRICING_WARD_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case PRICING_SALEMAN_GET_LIST:
      return {
        ...state,
        loading: true,
      };

    case PRICING_SALEMAN_GET_LIST_SUCCESS:
      const { salemans } = action.payload;
      
      return {
        ...state,
        loading: false,
        salemans
      };

    case PRICING_SALEMAN_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    default:
      return { ...state };
  }
}
