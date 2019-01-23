import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './settings/reducer';
import authUser from './auth/reducer';
import status from './master-data/status/reducer';

const reducers = combineReducers({
  form: reduxFormReducer,
  settings,
  authUser,
  status
});

export default reducers;