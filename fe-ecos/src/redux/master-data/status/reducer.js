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
  STATUS_DELETE_ITEM_ERROR,
  STATUS_CHANGE_TYPE_MODAL
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

    case STATUS_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }

    case STATUS_GET_LIST:
      const { params } = action.payload;
      return { 
        ...state, 
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case STATUS_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case STATUS_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false, 
        errors: action.payload 
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
        errors: null
      };

		case STATUS_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
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
        errors: null
      };

		case STATUS_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
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
        errors: action.payload 
      };

    case STATUS_CHANGE_TYPE_MODAL:
			return { 
        ...state, 
        modalType: action.payload
      };

    default: 
      return { ...state };
  }
}
