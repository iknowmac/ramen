
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true
  });
  let enhancer;
  let middleware = applyMiddleware(
    thunkMiddleware,
    routerMiddleware,
  );

  if (process.env.NODE_ENV !== 'production') {
    let middlewares = [
      require('redux-immutable-state-invariant')(),
      thunkMiddleware,
      logger
    ];
    middleware = applyMiddleware(...middlewares);
    let getDebugSessionKey = function () {
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return (matches && matches.length) ? matches[1] : null;
    };
    enhancer = compose(
      middleware,
      window.devToolsExtension
        ? window.devToolsExtension()
        : require('../containers/DevTools').default.instrument(),
      persistState(getDebugSessionKey())
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
