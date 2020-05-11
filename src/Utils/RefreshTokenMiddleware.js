import {AUTH_ERROR, CLEAR_ALL} from '../actions/types';
import NavigationService from '../navigation/NavigationService';

// Middleware to clear user data and reset the navigation when the token has expired(AUTH_ERROR).
export const customMiddleware = store => next => action => {
  
  if (action.type === AUTH_ERROR) {
    console.log(action, 'check action');
    NavigationService.navigate('LoginScreen', {session_timeout: true});
   console.log("here")
    store.dispatch({type: CLEAR_ALL});
  }
  next(action);
};
