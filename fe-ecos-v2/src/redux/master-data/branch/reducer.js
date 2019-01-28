import {
  BRANCH_TOGGLE_MODAL,
  BRANCH_GET_LIST,
  BRANCH_GET_LIST_SUCCESS,
  BRANCH_GET_LIST_ERROR,
  BRANCH_ADD_ITEM,
  BRANCH_ADD_ITEM_SUCCESS,
  BRANCH_ADD_ITEM_ERROR,
  BRANCH_UPDATE_ITEM,
  BRANCH_UPDATE_ITEM_SUCCESS,
  BRANCH_UPDATE_ITEM_ERROR,
  BRANCH_DELETE_ITEM,
  BRANCH_DELETE_ITEM_SUCCESS,
  BRANCH_DELETE_ITEM_ERROR
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

    case BRANCH_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload,
        error: null
      }

    case BRANCH_GET_LIST:
      const { params } = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case BRANCH_GET_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        items: action.payload 
      };

    case BRANCH_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case BRANCH_ADD_ITEM:
			return { 
        ...state, 
        loading: true 
      };

		case BRANCH_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        error: null
      };

		case BRANCH_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case BRANCH_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case BRANCH_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        error: null
      };

		case BRANCH_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case BRANCH_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case BRANCH_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

		case BRANCH_DELETE_ITEM_ERROR:
			return { 
        ...state, 
        error: action.payload 
      };

    default: 
      return { ...state };
  }
}
