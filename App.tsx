/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/config/navigation';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/redux/reducers';
import rootSaga from './src/redux';
import { View } from 'react-native';
import { colors } from './src/utils/color';
import {SCREEN_WIDTH} from './src/utils/screen'
import MiniPlayer from './src/component/MiniPlayer';



declare const global: {HermesInternal: null | {}};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
        <MiniPlayer />
    </Provider>
  );
};

sagaMiddleware.run(rootSaga)

export default App;
