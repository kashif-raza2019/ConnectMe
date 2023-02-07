/**
 * @ React Native Chat Application
 */
import React from 'react';
import MainScreen from './src/screens/MainScreen';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/reducers/configStore';
import AsyncStorage from '@react-native-async-storage/async-storage';



function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainScreen />
    </PersistGate>
    </Provider>
  );
}

export default App;
// AsyncStorage.clear();
