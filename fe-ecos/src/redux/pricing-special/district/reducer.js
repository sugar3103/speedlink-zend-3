import {
  PRI_SPECIAL_DISTRICT_ERROR,

  PRI_SPECIAL_DESTINATION_DISTRICT_GET_LIST,
  PRI_SPECIAL_DESTINATION_DISTRICT_GET_LIST_SUCCESS,
  PRI_SPECIAL_DESTINATION_DISTRICT_RESET_STATE,

  PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_GET_LIST,
  PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_GET_LIST_SUCCESS,
  PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_RESET_STATE,

} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loadingDestination: true,
  destination: [],
  loadingDestinationCreate: true,
  destinationCreate: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRI_SPECIAL_DISTRICT_ERROR:
      return {
        ...state,
        loadingOrigin: false,
        loadingDestination: false,
        errors: action.payload
      };

    case PRI_SPECIAL_DESTINATION_DISTRICT_GET_LIST:
      return {
        ...state,
        loadingDestination: true
      };

    case PRI_SPECIAL_DESTINATION_DISTRICT_GET_LIST_SUCCESS:
      const { destination } = action.payload;
      return { 
        ...state, 
        loadingDestination: false, 
        destination
      };

    case PRI_SPECIAL_DESTINATION_DISTRICT_RESET_STATE:
      return { 
        ...state, 
        loadingDestination: false, 
        destination: []
      };

    case PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_GET_LIST:
      return {
        ...state,
        loadingDestinationCreate: true
      };

    case PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_GET_LIST_SUCCESS:
      const { destinationCreate } = action.payload;
      return { 
        ...state, 
        loadingDestinationCreate: false, 
        destinationCreate
      };

    case PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_RESET_STATE:
      return { 
        ...state, 
        loadingDestinationCreate: false, 
        destinationCreate: []
      };

    default:
      return { ...state };
  }
}
