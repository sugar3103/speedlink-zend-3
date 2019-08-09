import {
  PRI_SPECIAL_CITY_ERROR,

  PRI_SPECIAL_ORIGIN_CITY_GET_LIST,
  PRI_SPECIAL_ORIGIN_CITY_GET_LIST_SUCCESS,
  PRI_SPECIAL_ORIGIN_CITY_RESET_STATE,

  PRI_SPECIAL_DESTINATION_CITY_GET_LIST,
  PRI_SPECIAL_DESTINATION_CITY_GET_LIST_SUCCESS,
  PRI_SPECIAL_DESTINATION_CITY_RESET_STATE

} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loadingOrigin: true,
  loadingDestination: true,
  origin: [],
  destination: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRI_SPECIAL_CITY_ERROR:
      return {
        ...state,
        loadingOrigin: false,
        loadingDestination: false,
        errors: action.payload
      };

    case PRI_SPECIAL_ORIGIN_CITY_GET_LIST:
      return {
        ...state,
        loadingOrigin: true
      };

    case PRI_SPECIAL_ORIGIN_CITY_GET_LIST_SUCCESS:
      const { origin } = action.payload;
      return { 
        ...state, 
        loadingOrigin: false, 
        origin
      };

    case PRI_SPECIAL_ORIGIN_CITY_RESET_STATE:
      return { 
        ...state, 
        loadingOrigin: false, 
        origin: []
      };

    case PRI_SPECIAL_DESTINATION_CITY_GET_LIST:
      return {
        ...state,
        loadingDestination: true
      };

    case PRI_SPECIAL_DESTINATION_CITY_GET_LIST_SUCCESS:
      const { destination } = action.payload;
      return { 
        ...state, 
        loadingDestination: false, 
        destination
      };

    case PRI_SPECIAL_DESTINATION_CITY_RESET_STATE:
      return { 
        ...state, 
        loadingDestination: false, 
        destination: []
      };
    default:
      return { ...state };
  }
}
