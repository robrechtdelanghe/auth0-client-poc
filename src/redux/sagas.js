import { all } from 'redux-saga/effects'

import { watchStartLogin, watchLoginCallback, watchStartLogout, watchChangePassword, watchCheckSession, watchUpdateUser, watchStartSetApi } from './auth/auth.saga'
import { watchAddLine, watchDeleteLine } from './data/data.saga'
import {watchCreateToast} from "./toast/toast.saga"

function* sagas() {
  yield all([
    watchStartLogin(),
    watchLoginCallback(),
    watchStartLogout(),
    watchChangePassword(),
    watchCheckSession(),
    watchUpdateUser(),
    watchStartSetApi(),
    watchAddLine(),
    watchDeleteLine(),
    watchCreateToast(),
  ])
}

export default sagas
