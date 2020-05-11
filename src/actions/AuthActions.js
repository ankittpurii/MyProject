import {executeGetRequest} from '../Utils/FetchUtils';
import {LOADING_STATUS, LOGIN_USER, CLEAR_ALL} from './types';
import {showAlert} from '../Utils/AlertHelper';

export const signIn = (username, password, navigation) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const res = await executeGetRequest(
        `login-api.php?unm=${username}&pwd=${password}`,undefined, navigation, true
      );
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.status == 'success') {
        dispatch({type: LOGIN_USER, payload: res});
      } else if (res.status == 'failure') {
        showAlert('Invalid login');
      } else {
        throw 'Invalid Login';
      }
      return {success: res};
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

export const resetAllReducers = () => {
  return dispatch => {
    dispatch({type: CLEAR_ALL, payload: ''});
  };
};
