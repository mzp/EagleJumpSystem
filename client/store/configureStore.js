import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

const finalCreateStore = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  return store;
}
