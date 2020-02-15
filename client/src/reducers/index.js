import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import itemReducer from './itemReducer';
import jobItemReducer from './jobItemReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  jobItem: jobItemReducer,
  item: itemReducer
});
