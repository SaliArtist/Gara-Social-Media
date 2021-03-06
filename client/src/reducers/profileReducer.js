import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  UPDATE_AVATAR,
  PROFILE_NOT_FOUND,
  GET_PROFILES,
  PROFILE_ERROR,
} from '../actionTypes/actionTypes';
import isEmpty from '../validation/isEmpty';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
  // avatar: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    // case UPDATE_AVATAR:
    //   return {
    //     ...state,
    //     avatar: action.payload,
    //   };
    case GET_PROFILES:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};
