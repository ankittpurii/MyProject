import {executeGetRequest} from '../Utils/FetchUtils';
import {LOADING_STATUS, UPDATE_ARRAY} from './types';
import Config from '../Utils/Config';
import {store} from '../App';

export const getOrdersList = (date, navigation) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const token = getState().persistedReducer.token;
      const res = await executeGetRequest(
        `order-list-api.php?tkn=${token}&dt=${date}`,
        undefined,
        navigation,
      );
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.orders) {
        return {success: res.orders};
      } else if (res.status == 'failure') {
        console.log('here');
        navigation.navigate('LoginScreen');
      } else {
        throw 'No orders';
      }
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

export const getOrdersDetails = (orderId, navigation) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const token = getState().persistedReducer.token;
      const res = await executeGetRequest(
        `order-api.php?tkn=${token}&oid=${orderId}`,
        undefined,
        navigation,
      );
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.orders) {
        return {success: res.orders};
      } else {
        throw 'No orders';
      }
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

export const getSizeBaseData = navigation => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const token = getState().persistedReducer.token;
      const res = await executeGetRequest(
        `size-base-api.php?tkn=${token}`,
        undefined,
        navigation,
      );
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.sizes) {
        return {success: res.sizes};
      } else {
        throw 'No orders';
      }
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

export const getItemData = navigation => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const token = getState().persistedReducer.token;
      const res = await executeGetRequest(
        `item-api.php?tkn=${token}&act=Show`,
        undefined,
        navigation,
      );
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.items) {
        return {success: res.items};
      } else {
        throw 'No orders';
      }
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

export const updateItemData = (itemId, active, navigation) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const token = getState().persistedReducer.token;
      const res = await executeGetRequest(
        `item-api.php?tkn=${token}&act=Update&itemid=${itemId}&active=${active}`,
        undefined,
        navigation,
      );
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.items) {
        return {success: res.items};
      } else {
        throw 'No orders';
      }
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

export const getCategoryData = navigation => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const token = getState().persistedReducer.token;
      const res = await executeGetRequest(
        `category-api.php?tkn=${token}&act=Show`,
        undefined,
        navigation,
      );
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.categories) {
        return {success: res.categories};
      } else {
        throw 'No orders';
      }
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

export const updateCategoryData = (catId, active, navigation) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const token = getState().persistedReducer.token;
      const res = await executeGetRequest(
        `category-api.php?tkn=${token}&act=Update&catid=${catId}&active=${active}`,
        undefined,
        navigation,
      );
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.items) {
        return {success: res.items};
      } else {
        throw 'No orders';
      }
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

export const getToppingData = navigation => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const token = getState().persistedReducer.token;
      `https://esofttechnologies.com.au/restroapp/topping-api.php`;
      const res = await executeGetRequest(
        `topping-api.php?tkn=${token}&act=Show`,
        undefined,
        navigation,
      );
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.toppings) {
        return {success: res.toppings};
      } else {
        throw 'No orders';
      }
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

export const updateToppingData = (name, active, navigation) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const token = getState().persistedReducer.token;
      const res = await executeGetRequest(
        `topping-api.php?tkn=${token}&act=Update&name=${name}&active=${active}`,
        undefined,
        navigation,
      );
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.toppings) {
        return {success: res.toppings};
      } else {
        throw 'No orders';
      }
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

export const updateSizeBaseData = (sizeBaseData, navigation) => {
  return async (dispatch, getState) => {
    dispatch({type: LOADING_STATUS, payload: true});
    try {
      const token = getState().persistedReducer.token;

      let data = {};
      data.tkn = token;
      data.sbarr = createJSON(sizeBaseData);
      console.log(JSON.stringify(data));
      const endpoint =
        'https://esofttechnologies.com.au/restroapp/set-size-base.php';
      const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });
      const response = await res.json();
      if (response?.status == 'failure') {
        navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
        store.dispatch({type: CLEAR_ALL, payload: ''});
        throw '401';
      }
      dispatch({type: LOADING_STATUS, payload: false});
      if (res.sizes) {
        return {success: res.toppings};
      } else {
        throw 'No orders';
      }
    } catch (err) {
      dispatch({type: LOADING_STATUS, payload: false});
      return {error: err};
    }
  };
};

const createJSON = array => {
  let JSONarray = [];
  for (let i = 0; i < array.length; i++) {
    JSONarray.push({
      szid: array[i].szid,
    });
    for (let j = 0; j < 2; j++) {
      if (array[i].bases[j].is_active == '1') {
        if (JSONarray[i].bid) {
          JSONarray[i].bid = '1,2';
        } else JSONarray[i].bid = array[i].bases[j].bid;
      }
    }
  }
  return JSONarray;
};
