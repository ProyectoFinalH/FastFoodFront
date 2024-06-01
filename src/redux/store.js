import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import dataReducer from "./reducer";

export const store = createStore(dataReducer, composeWithDevTools(applyMiddleware(thunk)))