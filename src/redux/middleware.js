import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

export const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
  level: 'info',
  collapsed: true,
})

sagaMiddleware.run()

export default [
  sagaMiddleware,
  logger,
]