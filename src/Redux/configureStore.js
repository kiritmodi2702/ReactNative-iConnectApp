import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistCombineReducers } from "redux-persist";
import { AsyncStorage } from "react-native";

// All Reducer file here
import UserReducer from "./Reducers/UserReducer";

const config = {
  key: "root",
  storage: AsyncStorage
};

const reducers = persistCombineReducers(config, {
  UserReducer
});

export const configureStore = () => {
  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  const persistor = persistStore(store);

  return { persistor, store };
};
