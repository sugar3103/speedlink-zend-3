import { combineReducers } from 'redux';
import country from './country/reducer';
import city from './city/reducer';
import district from './district/reducer';
import ward from './ward/reducer';
import rangeWeight from './range-weight/reducer';
import carrier from './carrier/reducer';
import customer from './customer/reducer';
import service from './service/reducer';
import shipmentType from './shipment-type/reducer';
import zone from './zone/reducer';
const reducers = combineReducers({
    country,
    city,
    district,
    ward,
    rangeWeight,
    customer, 
    carrier,
    service,
    shipmentType,
    zone
});

export default reducers;