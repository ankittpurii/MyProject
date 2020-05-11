import {
  LOGIN_USER,
  CLEAR_ALL,
  USER_DETAILS,
  UPDATE_ARRAY,
} from '../actions/types.js';
const INITIAL_STATE = {
  token: '',
  topic: 'admin',
  sizeBaseArray: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      let topic = action.payload.rname.replace(/ /g, '_');
      if (!/[a-zA-Z0-9-_.~%]/.test(topic)) {
        topic = "admin";
      }
      return {
        ...state,
        token: action.payload.token,
        topic: topic,
      };
    case UPDATE_ARRAY:
      return {...state, sizeBaseArray: action.payload};
    case CLEAR_ALL:
      return {...state, token: action.payload};
    default:
      return state;
  }
};
