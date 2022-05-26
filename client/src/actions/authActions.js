import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from '../actionTypes/actionTypes';
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';

export const login = (userData) => (dispatch) => {
  axios
    .post('/api/user/login', userData)
    .then((res) => {
      const { token } = res.data;
      // set token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // Set cerrent user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

// Set current user
export const setCurrentUser = (decoded) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });
};
