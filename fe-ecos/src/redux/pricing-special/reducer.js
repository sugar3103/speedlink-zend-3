import { combineReducers } from 'redux';
import pricing from './pricing/reducer';
import area from './area/reducer';
import zone from './zone/reducer';
import rangeWeight from './range-weight/reducer';
import carrier from './carrier/reducer';
import service from './service/reducer';
import shipmentType from './shipment-type/reducer';
import customer from './customer/reducer';
import approvedBy from './approved-by/reducer';
import saleman from './saleman/reducer';
import city from './city/reducer';
import district from './district/reducer';
import ward from './ward/reducer';
import importZone from './import/reducer';

const reducers = combineReducers({
    pricing,
    area,
    zone,
    rangeWeight,
    carrier, service, shipmentType,
    customer, approvedBy, saleman,
    city, district, ward,
    importZone
});

export default reducers;