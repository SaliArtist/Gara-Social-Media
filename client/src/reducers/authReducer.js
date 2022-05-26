import {
  LOGIN,
  LOGOUT,
  UPDATE_AVATAR,
  SET_CURRENT_USER,
} from '../actionTypes/actionTypes';
import isEmpty from '../validation/isEmpty';

const initialState = {
  isAuthenticated: false,
  current_user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        current_user: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        current_user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        current_user: {},
      };
    default:
      return state;
  }
};
