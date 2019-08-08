import { combineReducers } from 'redux';
import area from './area/reducer';
import zone from './zone/reducer';
import customer from './customer/reducer';
import city from './city/reducer';
import district from './district/reducer';
import ward from './ward/reducer';
import importZone from './import/reducer';

const reducers = combineReducers({
    area,
    zone,
    customer,
    city, district, ward,
    importZone
});

export default reducers;