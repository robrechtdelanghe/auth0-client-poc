import { all } from 'redux-saga/effects'

import authSagas from './auth/auth.saga'
import dataSagas from './data/data.saga'
import toastSagas from "./toast/toast.saga"

function* sagas() {
  yield all([
    authSagas(),
    dataSagas(),
    toastSagas(),
  ])
}

export default sagas
