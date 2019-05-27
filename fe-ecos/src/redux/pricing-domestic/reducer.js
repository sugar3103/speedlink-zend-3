import { combineReducers } from 'redux';
import area from './area/reducer';
import zone from './zone/reducer';
import rangeWeight from './range-weight/reducer';
import carrier from './carrier/reducer';
import service from './service/reducer';
import shipmentType from './shipment-type/reducer';
import customer from './customer/reducer';
import approvedBy from './approved-by/reducer';
import saleman from './saleman/reducer';
import pricing from './pricing/reducer';
const reducers = combineReducers({
    area,
    zone,
    rangeWeight,
    carrier,
    service,
    shipmentType,
    customer, 
    approvedBy,
    saleman,
    pricing
});

export default reducers;