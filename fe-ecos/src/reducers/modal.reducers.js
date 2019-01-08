import { modalConstants } from '../constants';

var initialState = {
  isOpen: false,
  id: null
}

export function modal(state = initialState, action) {
  switch (action.type) {
    case modalConstants.TOGGLE:
      return {
        isOpen: !state.isOpen,
        id: action.id ? action.id : null
      }
    case modalConstants.OPEN:
      return {
        isOpen: true,
        id: action.id ? action.id : null
      }
    case modalConstants.CLOSE:
      return {
        isOpen: false
      };
    default:
      return state
  }
}