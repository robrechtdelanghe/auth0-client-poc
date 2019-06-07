import { call, put, takeEvery } from 'redux-saga/effects';

import {LOGIN_START, loginSuccess, loginError, LOGIN_ERROR, LOGIN_SUCCESS} from './settings.actions'

function* startLoginSaga(action) {
  try {
    console.log('OWKEAH')
    yield put(loginSuccess());
  } catch (error) {
    console.error('Error sending vehicle message', error);
    yield put(loginError(error));
  }

}

export function* watchStartLogin() {
  yield takeEvery(LOGIN_START, startLoginSaga);
}