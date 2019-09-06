import {
  SYSTEM_INFO,
  SYSTEM_INFO_SUCCESS
} from '../../constants/actionTypes';

const INIT_STATE = {
  items: [],
  errors: null,
  loading: true,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SYSTEM_INFO:
      return {
        ...state,
        loading: true
      };
    case SYSTEM_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    default:
      return { ...state };
  }
}
