/**
 * @format
 */
import React, { Component } from "react";
//https://react-native-community.github.io/upgrade-helper/?from=0.59.10&to=0.60.3
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import { configureStore } from "./src/Redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
const { persistor, store } = configureStore();

const RNReduxA = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNReduxA);
