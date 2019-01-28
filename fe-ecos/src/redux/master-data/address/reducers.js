import { combineReducers } from 'redux';
import code from './code/reducer';
import country from './country/reducer';
import city from './city/reducer';
import district from './district/reducer';
import ward from './ward/reducer';
const reducers = combineReducers({
    code,
    country,
    city,
    district,
    ward
});

export default reducers;