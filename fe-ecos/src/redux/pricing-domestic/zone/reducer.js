import {
  PRI_DOM_ZONE_ERROR,
  PRI_DOM_ZONE_TOGGLE_MODAL,
  PRI_DOM_ZONE_CHANGE_TYPE_MODAL,

  PRI_DOM_ZONE_GET_LIST,
  PRI_DOM_ZONE_GET_LIST_SUCCESS,

  PRI_DOM_ZONE_ADD_ITEM,
  PRI_DOM_ZONE_ADD_ITEM_SUCCESS,

  PRI_DOM_ZONE_UPDATE_ITEM,
  PRI_DOM_ZONE_UPDATE_ITEM_SUCCESS,

  PRI_DOM_ZONE_DELETE_ITEM,
  PRI_DOM_ZONE_DELETE_ITEM_SUCCESS,
} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loading: true,
  items: [],
  total: 0,
  modalOpen: false,
  modalData: null,
  modalType: null,
  paramSearch: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRI_DOM_ZONE_TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalData: action.payload.data,
        modalType: action.payload.type,
        errors: null
      };

    case PRI_DOM_ZONE_CHANGE_TYPE_MODAL:
			return { 
        ...state, 
        modalType: action.payload
      };

    case PRI_DOM_ZONE_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case PRI_DOM_ZONE_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case PRI_DOM_ZONE_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
        total
      };

    case PRI_DOM_ZONE_ADD_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_DOM_ZONE_ADD_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };

    case PRI_DOM_ZONE_UPDATE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_DOM_ZONE_UPDATE_ITEM_SUCCESS:
			return { 
        ...state, 
        loading: false, 
        errors: null
      };
      
    case PRI_DOM_ZONE_DELETE_ITEM:
			return { 
        ...state, 
        loading: false 
      };

		case PRI_DOM_ZONE_DELETE_ITEM_SUCCESS:
			return { 
        ...state, 
      };

    default:
      return { ...state };
  }
}
