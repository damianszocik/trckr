import {
    combineReducers
} from 'redux';
import {
    data
} from './data';
import {
    system
} from './system';
import {
    user
} from './user'

export default combineReducers({
    data,
    system,
    user
})