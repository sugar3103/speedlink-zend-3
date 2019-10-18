import {
  CUSTOMER_TOGGLE_MODAL,
  CUSTOMER_GET_LIST,
  CUSTOMER_GET_LIST_SUCCESS,
  CUSTOMER_GET_LIST_ERROR,
  CUSTOMER_ADD_ITEM,
  CUSTOMER_ADD_ITEM_SUCCESS,
  CUSTOMER_ADD_ITEM_ERROR,
  CUSTOMER_UPDATE_ITEM,
  CUSTOMER_UPDATE_ITEM_SUCCESS,
  CUSTOMER_UPDATE_ITEM_ERROR,
  CUSTOMER_DELETE_ITEM,
  CUSTOMER_DELETE_ITEM_SUCCESS,
  CUSTOMER_DELETE_ITEM_ERROR,
  CUSTOMER_CHANGE_TYPE_MODAL
} from '../../../constants/actionTypes';

const INIT_STATE = {
  items: [],
  total: 0,
  errors: null,
  loading: true,
  modalOpen: false,
  modalData: null,
  modalType: null,
  paramSearch: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case CUSTOMER_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }

    case CUSTOMER_GET_LIST:
      const { params } = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case CUSTOMER_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case CUSTOMER_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case CUSTOMER_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case CUSTOMER_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case CUSTOMER_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case CUSTOMER_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case CUSTOMER_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case CUSTOMER_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case CUSTOMER_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case CUSTOMER_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

		case CUSTOMER_DELETE_ITEM_ERROR:
			return { 
        ...state, 
        errors: action.payload 
      };

    case CUSTOMER_CHANGE_TYPE_MODAL:
			return { 
        ...state, 
        modalType: action.payload
      };

    default: 
      return { ...state };
  }
}
