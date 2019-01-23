import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './settings/reducer';
import authUser from './auth/reducer';
import status from './master-data/status/reducer';
import user from './user/reducer';
import role from './role/reducer';
import permisson from './permisson/reducer';

const reducers = combineReducers({
  form: reduxFormReducer,
  settings,
  authUser,
  status,
  user,
  role,
  permisson
});

export default reducers;