import {store} from '../App';
import {AUTH_ERROR, CLEAR_ALL} from '../actions/types';
import {showAlert} from './AlertHelper';
import firebase from 'react-native-firebase';

export const executeGetRequest = async (
  endpoint,
  token,
  navigation,
  from = null,
) => {
    try {
    const res = await fetch(
      `https://esofttechnologies.com.au/restroapp/${endpoint}`,
      {
        method: 'GET',
        headers: getAPIHeader(token),
      },
    );
    const response = await res.json();
    console.log(`Response for ${endpoint}`, response);
    if (response?.status == 'failure') {
      if (from) {
        throw '400';
      } else {
        navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
        store.dispatch({type: CLEAR_ALL, payload: ''});
        throw '401';
      }
    }
    return response;
  } catch (err) {
    if (err == '401') showAlert('Please Login again');
    if (err == '400') showAlert('Invalid Login');

    const topic = store.getState().persistedReducer.topic
    firebase
      .messaging()
      .unsubscribeFromTopic(topic)
      .then(() => console.log('Unsubscribed fom the topic!', topic));
    console.log(`Response for ${endpoint}`, response);
  }
};

const getAPIHeader = (token, isUrlEncoded) => {
  return {
    Accept: 'application/json',
    'Content-Type': isUrlEncoded
      ? 'application/x-www-form-urlencoded'
      : 'application/json',
    authorization: token ? 'Bearer ' + token : '',
  };
};
