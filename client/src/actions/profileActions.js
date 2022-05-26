import axios from 'axios';
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  PROFILE_ERROR,
  PROFILE_NOT_FOUND,
  GET_PROFILES,
  GET_ERRORS,
  SET_CURRENT_USER,
  UPDATE_AVATAR,
} from '../actionTypes/actionTypes';

export const getcurrentprofile = (userData) => (dispatch) => {
  dispatch(setprofileloading());
  axios
    .get('/api/profile/')
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: null,
      });
    });
};

export const updateAvatar = (newAvatar) => (dispatch) => {
  axios
    .post('/api/profile/update-avatar', newAvatar)
    .then((res) => {
      dispatch({
        type: UPDATE_AVATAR,
        payload: res.data,
      });
    })
    .catch((err) => {
      let message =
        typeof err.response !== 'undefined' ? err.response.data : null;
      dispatch({
        type: GET_ERRORS,
        payload: message,
      });
    });
};

export const getProfileByUname = (handle) => (dispatch) => {
  dispatch(setprofileloading());
  axios
    .get(`/api/profile/${handle}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: null,
      });
    });
};

export const getProfiles = () => (dispatch) => {
  dispatch(setprofileloading());
  axios
    .get('/api/profile/all')
    .then((res) => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILES,
        payload: null,
      });
    });
};

export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post('/api/profile/', profileData)
    .then((res) => history.push('/dashboard'))
    .catch((err) => {
      let message =
        typeof err.response !== 'undefined' ? err.response.data : null;
      dispatch({
        type: GET_ERRORS,
        payload: message,
      });
    });
};

export const deleteProfile = () => (dispatch) => {
  if (window.confirm('Are You Sure You Want To Delete Your Account?')) {
    axios
      .delete('/api/profile')
      .then((res) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((err) => {
        let message =
          typeof err.response !== 'undefined' ? err.response.data : null;
        dispatch({
          type: GET_ERRORS,
          payload: message,
        });
      });
  }
};

export const setprofileloading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const clearcurrentprofile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
