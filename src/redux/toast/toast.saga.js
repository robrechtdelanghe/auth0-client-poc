import {put, takeLatest} from 'redux-saga/effects'

import {clearToast, CREATE_TOAST, setToastMessage,} from './toast.actions'
import {wait} from "../../utils/utils"

function* createToast({payload}) {
  try {
    yield put(setToastMessage(payload.message))
    yield wait(payload.time || 5000)
    yield put(clearToast())

  } catch (error) {
    console.error('Error toasting line', error)
  }
}

export function* watchCreateToast() {
  yield takeLatest(CREATE_TOAST, createToast);
}
