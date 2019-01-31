import { combineReducers } from 'redux';
import permission from './permission/reducer';
import role from './role/reducer';
import user from './user/reducer';
const reducers = combineReducers({
    permission,
    role,
    user
});

export default reducers;