import { REGISTER } from '../actionTypes/actionTypes';

const initialState = {
  user: {},
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
