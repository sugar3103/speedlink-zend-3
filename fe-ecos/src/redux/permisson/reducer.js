import {
  PERMISSON_TOGGLE_MODAL,
  PERMISSON_GET_LIST,
  PERMISSON_GET_LIST_SUCCESS,
  PERMISSON_GET_LIST_ERROR,
  PERMISSON_ADD_ITEM,
  PERMISSON_ADD_ITEM_SUCCESS,
  PERMISSON_ADD_ITEM_ERROR,
  PERMISSON_UPDATE_ITEM,
  PERMISSON_UPDATE_ITEM_SUCCESS,
  PERMISSON_UPDATE_ITEM_ERROR,
  PERMISSON_DELETE_ITEM,
  PERMISSON_DELETE_ITEM_SUCCESS,
  PERMISSON_DELETE_ITEM_ERROR
} from '../../constants/actionTypes';

const INIT_STATE = {
  items: null,
  total: 0,
  error: null,
  loading: true,
  modalOpen: false,
  modalData: null,
  paramSearch: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case PERMISSON_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload,
        error: null
      }

    case PERMISSON_GET_LIST:
      const params = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case PERMISSON_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case PERMISSON_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case PERMISSON_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PERMISSON_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        error: null
      };

		case PERMISSON_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case PERMISSON_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PERMISSON_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        error: null
      };

		case PERMISSON_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case PERMISSON_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PERMISSON_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

		case PERMISSON_DELETE_ITEM_ERROR:
			return { 
        ...state, 
        error: action.payload 
      };

    default: 
      return { ...state };
  }
}
