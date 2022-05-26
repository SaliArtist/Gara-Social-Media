import axios from 'axios';
import {
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  GET_ERRORS,
  DELETE_POST,
  ADD_LIKE,
} from '../actionTypes/actionTypes';

export const addPost = (postData) => (dispatch) => {
  axios
    .post('/api/posts/', postData)
    .then((res) => {
      dispatch({
        type: ADD_POST,
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

export const getMyPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts/me')
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_POSTS,
        payload: null,
      });
    });
};

export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts/following')
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_POSTS,
        payload: null,
      });
    });
};

export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const addLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then((res) => {
      dispatch(getMyPosts());
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const addComment = (postId, newComment) => (dispatch) => {
  axios
    .post(`/api/posts/comment/${postId}`, newComment)
    .then((res) => {
      dispatch(getMyPosts());
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};
