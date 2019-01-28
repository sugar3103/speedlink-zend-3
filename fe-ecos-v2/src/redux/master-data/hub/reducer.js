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
  HUB_GET_LIST_SELECT,
  HUB_GET_LIST_SELECT_SUCCESS,
  HUB_GET_LIST_SELECT_ERROR
} from '../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
  error: null,
  loading: true,
  modalOpen: false,
  modalData: null,
  paramSearch: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case HUB_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload,
        error: null
      }

    case HUB_GET_LIST:
      const { params } = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case HUB_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        items: action.payload 
      };

    case HUB_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case HUB_ADD_ITEM:
			return { 
        ...state, 
        loading: true 
      };

		case HUB_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        error: null
      };

		case HUB_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        error: action.payload 
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
        error: null
      };

		case HUB_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        error: action.payload 
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
        error: action.payload 
      };

    case HUB_GET_LIST_SELECT:      
      return { 
        ...state, 
        loading: true,
        paramSearch: (action.payload.params && action.payload.params.query) ? action.payload.params.query : null
      };

    case HUB_GET_LIST_SELECT_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        items: action.payload 
      };

    case HUB_GET_LIST_SELECT_ERROR:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    default: 
      return { ...state };
  }
}
