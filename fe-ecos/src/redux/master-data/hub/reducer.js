import {
  HUB_TOGGLE_MODAL,
  HUB_GET_LIST,
  HUB_GET_LIST_SUCCESS,
  HUB_GET_LIST_ERROR,
  HUB_ADD_ITEM,
  HUB_ADD_ITEM_SUCCESS,
  HUB_ADD_ITEM_ERROR,
  HUB_UPDATE_ITEM,
  HUB_UPDATE_ITEM_SUCCESS,
  HUB_UPDATE_ITEM_ERROR,
  HUB_DELETE_ITEM,
  HUB_DELETE_ITEM_SUCCESS,
  HUB_DELETE_ITEM_ERROR,
  HUB_CHANGE_TYPE_MODAL,
  HUB_COUNTRY_GET_LIST,
  HUB_COUNTRY_GET_LIST_SUCCESS,
  HUB_COUNTRY_GET_LIST_ERROR,
  HUB_CITY_GET_LIST,
  HUB_CITY_GET_LIST_SUCCESS,
  HUB_CITY_GET_LIST_ERROR
} from '../../../constants/actionTypes';

const INIT_STATE = {
  items: [],
  total: 0,
  errors: null,
  loading: true,
  modalOpen: false,
  modalData: null,
  modalType: null,
  paramSearch: null,
  country_hub: null,
  city_hub: null
};

export default (state = INIT_STATE, action) => {
  let params= null;
  switch (action.type) {

    case HUB_TOGGLE_MODAL:
    if(action.payload.type === 'add' || state.modalOpen)
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        city_hub: null,
        errors: null
      }
    else
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }
    
    case HUB_CHANGE_TYPE_MODAL:
			return { 
        ...state, 
        modalType: action.payload
      };

    case HUB_GET_LIST:
       params  = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case HUB_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case HUB_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case HUB_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case HUB_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case HUB_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case HUB_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case HUB_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case HUB_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case HUB_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case HUB_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

		case HUB_DELETE_ITEM_ERROR:
			return { 
        ...state, 
        errors: action.payload 
      };
    
    case HUB_COUNTRY_GET_LIST:
    params = action.payload.params;
      return {
        ...state
      };

    case HUB_COUNTRY_GET_LIST_SUCCESS:
      const { country_hub } = action.payload;
      return {
        ...state,
        country_hub
      };

    case HUB_COUNTRY_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

      case HUB_CITY_GET_LIST:
      return {
        ...state
      };

    case HUB_CITY_GET_LIST_SUCCESS:
    const { city_hub } = action.payload;
   
      return {
        ...state,
        loading: false,
        city_hub
      };

    case HUB_CITY_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    default: 
      return { ...state };
  }
}
