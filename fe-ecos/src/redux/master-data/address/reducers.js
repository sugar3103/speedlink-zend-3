import { combineReducers } from 'redux';
import code from './code/reducer';
import country from './country/reducer';
const reducers = combineReducers({
    code,
    country
});

export default reducers;