import {
  PRI_SPECIAL_SHIPMENT_TYPE_ERROR,

  PRI_SPECIAL_SHIPMENT_TYPE_GET_LIST,
  PRI_SPECIAL_SHIPMENT_TYPE_GET_LIST_SUCCESS,
} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loading: true,
  items: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRI_SPECIAL_SHIPMENT_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case PRI_SPECIAL_SHIPMENT_TYPE_GET_LIST:
      return {
        ...state,
        loading: true
      };

    case PRI_SPECIAL_SHIPMENT_TYPE_GET_LIST_SUCCESS:
      const { items } = action.payload;
      return { 
        ...state, 
        loading: false, 
        items,
      };
      
    default:
      return { ...state };
  }
}
