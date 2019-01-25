import { combineReducers } from 'redux';
import code from './code/reducer';
import country from './country/reducer';
import city from './city/reducer';
const reducers = combineReducers({
    code,
    country,
    city
});

export default reducers;