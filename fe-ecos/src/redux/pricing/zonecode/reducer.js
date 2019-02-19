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
  ZONECODE_DELETE_ITEM_ERROR
} from '../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
  total: 0,
  errors: null,
  loading: true,
  modalOpen: false,
  modalData: null,
  paramSearch: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ZONECODE_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload,
        errors: null
      }

    case ZONECODE_GET_LIST:
      const { params } = action.payload;
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

    default: 
      return { ...state };
  }
}
