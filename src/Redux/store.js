import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer"; // Importa tu reducer raíz aquí
import thunkMiddleware from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer, // Tu reducer raíz
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
