import { combineReducers } from 'redux';
import area from './area/reducer';
import zone from './zone/reducer';
import rangeWeight from './range-weight/reducer';
import carrier from './carrier/reducer';
import service from './service/reducer';
import shipmentType from './shipment-type/reducer';
const reducers = combineReducers({
    area,
    zone,
    rangeWeight,
    carrier,
    service,
    shipmentType
});

export default reducers;