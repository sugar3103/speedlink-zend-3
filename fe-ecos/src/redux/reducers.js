import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './settings/reducer';
import authUser from './auth/reducer';

const reducers = combineReducers({
  form: reduxFormReducer,
  settings,
  authUser
});

export default reducers;