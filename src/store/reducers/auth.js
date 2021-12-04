import {
  LOGIN_WITH_OAUTH_SUCCESS,
  ME_SUCCESS
  } from '../types';

const initialState = {
  isAuthenticated: false
}
  export default (state = initialState, { type, payload }) => {
    switch (type) {     
      case ME_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          me: payload,
      };
      case LOGIN_WITH_OAUTH_SUCCESS:
        localStorage.setItem('token', payload.token);
        return {
          ...state,
          isAuthenticated: true,
          token: payload.token,
          me: payload.me,
        };
      default:
        return state;
    }
  };
