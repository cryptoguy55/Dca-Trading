import {
    CHANGE_THEME,
    CHANGE_DROP
} from '../types';

const initial_state = {
    theme: true,
    drop: false
}
export default (state = initial_state, {type, payload}) => {
  switch (type) {     
    case CHANGE_THEME: 
        return { ...state, theme: payload }
    case CHANGE_DROP: 
        return { ...state, drop: payload }
    default:
      return state;
  }
};