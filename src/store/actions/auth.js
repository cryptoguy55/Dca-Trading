import axios from "axios";

import {
    LOGIN_WITH_OAUTH_SUCCESS,
    CHANGE_ALERT,
    CHANGE_LOADING,
    ME_SUCCESS,
    LOGOUT_SUCCESS
} from '../types';

const BaseUrl = process.env.REACT_APP_BACKEND_URL

export const loadMe = async (dispatch) => {

  const token = localStorage.getItem("token");
  try {
    const response = await axios.get('/api/users/me', {headers: {
      'x-auth-token': token,
    }});
    axios.defaults.headers.common['x-auth-token'] = token;
    dispatch({ type: ME_SUCCESS, payload: response.data.me });
    } catch (err) {
      localStorage.removeItem('token');
    }
};

export const loginUserWithEmail = async (dispatch, history, formData) => {
    dispatch({ type: CHANGE_LOADING, payload: true });
    try {
      const response = await axios.post(`${BaseUrl}/auth/login`, formData);  
      dispatch({type: LOGIN_WITH_OAUTH_SUCCESS, payload: { token: response.data.token, me: response.data.me }});  
      dispatch({ type: CHANGE_ALERT, payload: {success: 2, message: "successfully"}})
      history.push('/');
    } catch (err) {
      dispatch({ type: CHANGE_LOADING, payload: false });
      dispatch({ type: CHANGE_ALERT, payload: {success: 1, message: err.response.data.message}})
    }
  };

  export const registerUserWithEmail = async (dispatch, history, formData) => {
    dispatch({ type: CHANGE_LOADING, payload: true });
    try {
      await axios.post(`${BaseUrl}/auth/register`, formData);
      history.push('/Thankyou-Register');
      dispatch({ type: CHANGE_ALERT, payload: {success: 2, message: "successfully"}})
    } catch (err) {
      dispatch({ type: CHANGE_LOADING, payload: false });
      dispatch({ type: CHANGE_ALERT, payload: {success: 1, message: err.response.data.message}});
    }
  };

  export const logOutUser = (history) => async (dispatch) => {
    try {
      //just to log user logut on the server
      await axios.get('/auth/logout');
  
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      if (history) history.push('/');
    } catch (err) {}
  };
  