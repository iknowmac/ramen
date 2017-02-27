/* global window */

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
  const logger = createLogger({ collapsed: true });
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

    }) : compose;

  let enhancer;
  let middleware = applyMiddleware( thunkMiddleware );

  if (process.env.NODE_ENV !== 'production') {
    let middlewares = [
      require('redux-immutable-state-invariant')(),
      thunkMiddleware,
      logger
    ];
    middleware = applyMiddleware(...middlewares);
    enhancer = composeEnhancers(
      middleware,
    );
  } else {
    enhancer = compose(middleware);
  }

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
