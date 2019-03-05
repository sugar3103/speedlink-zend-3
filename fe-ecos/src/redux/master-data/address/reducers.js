import { combineReducers } from 'redux';
import code from './code/reducer';
import country from './country/reducer';
import city from './city/reducer';
import ward from './ward/reducer';
import district from './district/reducer';
const reducers = combineReducers({
    code,
    country,
    city,
    ward,
    district
});

export default reducers;