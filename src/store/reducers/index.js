import { combineReducers } from 'redux'
import common from './common'
import auth from './auth'
export default combineReducers({
    auth,
    common
});