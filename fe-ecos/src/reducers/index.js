import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { status } from './status.reducers';
import { modal } from './modal.reducers';

const rootReducer = combineReducers({
  authentication,
  alert,
  status,
  modal
});

export default rootReducer;