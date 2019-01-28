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
  total: 0,
  errors: null,
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
        errors: null
      }

    case BRANCH_GET_LIST:
      const { params } = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case BRANCH_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case BRANCH_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case BRANCH_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case BRANCH_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case BRANCH_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
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
        errors: null
      };

		case BRANCH_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
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
        errors: action.payload 
      };

    default: 
      return { ...state };
  }
}
