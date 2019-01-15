import {
  STATUS_TOGGLE_MODAL,
  STATUS_GET_LIST,
  STATUS_GET_LIST_SUCCESS,
  STATUS_GET_LIST_ERROR,
  STATUS_ADD_ITEM,
  STATUS_ADD_ITEM_SUCCESS,
  STATUS_ADD_ITEM_ERROR,
  STATUS_UPDATE_ITEM,
  STATUS_UPDATE_ITEM_SUCCESS,
  STATUS_UPDATE_ITEM_ERROR,
  STATUS_DELETE_ITEM,
  STATUS_DELETE_ITEM_SUCCESS,
  STATUS_DELETE_ITEM_ERROR
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

    case STATUS_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload,
        error: null
      }

    case STATUS_GET_LIST:
      const { params } = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case STATUS_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        items: action.payload 
      };

    case STATUS_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case STATUS_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case STATUS_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        error: null
      };

		case STATUS_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case STATUS_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case STATUS_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        error: null
      };

		case STATUS_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case STATUS_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case STATUS_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

		case STATUS_DELETE_ITEM_ERROR:
			return { 
        ...state, 
        error: action.payload 
      };

    default: 
      return { ...state };
  }
}
