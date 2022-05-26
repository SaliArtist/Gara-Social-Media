import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';
import { registerReducer } from './registerReducer';
import { profileReducer } from './profileReducer';
import { postReducer } from './postReducer';

export const masterReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
});
