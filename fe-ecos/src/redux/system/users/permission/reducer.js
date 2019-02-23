import {
  PERMISSION_TOGGLE_MODAL,
  PERMISSION_GET_LIST,
  PERMISSION_GET_LIST_SUCCESS,
  PERMISSION_GET_LIST_ERROR,
  PERMISSION_ADD_ITEM,
  PERMISSION_ADD_ITEM_SUCCESS,
  PERMISSION_ADD_ITEM_ERROR,
  PERMISSION_UPDATE_ITEM,
  PERMISSION_UPDATE_ITEM_SUCCESS,
  PERMISSION_UPDATE_ITEM_ERROR,
  PERMISSION_DELETE_ITEM,
  PERMISSION_DELETE_ITEM_SUCCESS,
  PERMISSION_DELETE_ITEM_ERROR,
  PERMISSION_CHANGE_TYPE_MODAL
} from '../../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
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

    case PERMISSION_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      }

    case PERMISSION_GET_LIST:
      const params = action.payload;
      return { 
        ...state, 
        loading: true,        
        paramSearch: (params && params.query) ? params.query : null
      };

    case PERMISSION_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false,         
        items,
        total
      };

    case PERMISSION_GET_LIST_ERROR:
      return { 
        ...state, 
        loading: false,
        errors: action.payload 
      };

    case PERMISSION_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PERMISSION_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case PERMISSION_ADD_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case PERMISSION_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PERMISSION_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

		case PERMISSION_UPDATE_ITEM_ERROR:
			return { 
        ...state, 
        loading: false, 
        errors: action.payload 
      };

    case PERMISSION_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PERMISSION_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

		case PERMISSION_DELETE_ITEM_ERROR:
			return { 
        ...state, 
        errors: action.payload 
      };
    case PERMISSION_CHANGE_TYPE_MODAL:
			return { 
        ...state, 
        modalType: action.payload
      };

    default: 
      return { ...state };
  }
}
