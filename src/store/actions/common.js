import {
    CHANGE_THEME,
} from '../types';
  
export const changeTheme = (dispatch,value) => {
    dispatch({type: CHANGE_THEME, payload: value})
};
