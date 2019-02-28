import {
  GET_SETTING,
  GET_SETTING_SUCCESS,
  GET_SETTING_ERROR,
  UPDATE_SETTING_SUCCESS,
  UPDATE_SETTING_ERROR,
  UPDATE_SETTING
} from '../../../constants/actionTypes';

const INIT_STATE = {
  items: null,
  errors: null,
  loading: true,
  paramSearch: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SETTING:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case GET_SETTING_SUCCESS:
      const { items } = action.payload;
      return {
        ...state,
        loading: false,
        items
      };

    case GET_SETTING_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case UPDATE_SETTING:
      return {
        ...state,
        loading: false
      };
    case UPDATE_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case UPDATE_SETTING_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return { ...state };
  }
}
