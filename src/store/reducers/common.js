import {
    CHANGE_THEME,
    CHANGE_ALERT,
    CHANGE_LOADING
} from '../types';

const initial_state = {
    theme: true,
    successAlert: null,
    errorAlert: null,
    isLoading: false

}
export default (state = initial_state, {type, payload}) => {
  switch (type) {     
    case CHANGE_THEME: 
        return { ...state, theme: payload }
    case CHANGE_LOADING: 
        return { ...state, isLoading: payload }
    case CHANGE_ALERT: 
        if(payload.success === 2) {
          return { ...state, successAlert: payload.message, errorAlert: null }
        } else if(payload.success === 1) {
          return { ...state, successAlert: null , errorAlert: payload.message }
        } else {
          return { ...state, successAlert: null , errorAlert: null }
        }
    default:
      return state;
  }
};