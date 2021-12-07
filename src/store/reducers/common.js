import {
    CHANGE_THEME
} from '../types';

const initial_state = {
    theme: true
}
export default (state = initial_state, {type, payload}) => {
  switch (type) {     
    case CHANGE_THEME: 
        return { ...state, theme: payload }
    default:
      return state;
  }
};