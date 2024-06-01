import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer'; // Importa tu reducer raíz aquí
import thunKMiddlewere from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer, // Tu reducer raíz
composeEnhancers(
    applyMiddleware(thunKMiddlewere)
)
);

export default store;