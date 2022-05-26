import axios from 'axios';
import { GET_ERRORS } from '../actionTypes/actionTypes';

export const register = (userData, history) => (dispatch) => {
  axios
    .post('/api/user/register', userData)
    .then((res) => history.push('/'))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response || {}.data,
      });
    });
};
