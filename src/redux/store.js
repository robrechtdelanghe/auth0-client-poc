import { createStore, applyMiddleware  } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import reducers from './reducers'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
  level: 'info',
  collapsed: true,
})

const store = createStore(
  reducers,
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(saga)

export default store
