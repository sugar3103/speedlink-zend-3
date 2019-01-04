import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { status } from './status.reducers';

const rootReducer = combineReducers({
  authentication,
  alert,
  status,
});

export default rootReducer;