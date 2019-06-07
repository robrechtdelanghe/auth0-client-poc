import { all } from 'redux-saga/effects'

import { watchStartLogin, watchLoginCallback, watchStartLogout  } from './auth/auth.saga'

function* sagas() {
  yield all([
    watchStartLogin(),
    watchLoginCallback(),
    watchStartLogout(),
  ])
}

export default sagas
