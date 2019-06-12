import { all } from 'redux-saga/effects'

import { watchStartLogin, watchLoginCallback, watchStartLogout, watchChangePassword, watchCheckSession, watchUpdateUser } from './auth/auth.saga'
import { watchAddLine, watchDeleteLine } from './data/data.saga'

function* sagas() {
  yield all([
    watchStartLogin(),
    watchLoginCallback(),
    watchStartLogout(),
    watchChangePassword(),
    watchCheckSession(),
    watchUpdateUser(),
    watchAddLine(),
    watchDeleteLine(),
  ])
}

export default sagas
