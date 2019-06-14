import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import reducers from './reducers'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
  level: 'info',
  collapsed: true,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(logger, sagaMiddleware))
);

sagaMiddleware.run(saga)

export default store
