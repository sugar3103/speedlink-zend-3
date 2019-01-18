import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './settings/reducer';

const reducers = combineReducers({
  form: reduxFormReducer,
  settings,
});

export default reducers;