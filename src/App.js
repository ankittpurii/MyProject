import React from 'react';
import {View} from 'react-native';
import Router from './navigation/Router';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import {customMiddleware} from './Utils/RefreshTokenMiddleware';
import {navigationRef} from './navigation/NavigationService'

export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, customMiddleware),
);

const App = props => {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router forwardRef={navigationRef} />
      </PersistGate>
    </Provider>
  );
};

export default App;
