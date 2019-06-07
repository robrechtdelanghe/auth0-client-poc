import { select, call, put, takeEvery } from 'redux-saga/effects';

import {
  LOGIN_START,
  LOGIN_CALLBACK,
  loginSuccess,
  loginError,
  LOGOUT_START,
  logoutSuccess,
  logoutError,
} from './auth.actions'

function* startLoginSaga() {
  try {
    const { auth, settings } = yield select();
    auth.auth0.authorize({
      scope: 'openid profile email update:current_user_metadata user_metadata',
      language: settings.language
    });
  } catch (error) {
    yield put(logoutError(error));
    console.log('Error logging out the user', error)
  }
}

function* loginCallbackSaga({ payload: history}) {
  try {
    const { auth } = yield select();
    const authResult = yield promiseParseHash(auth.auth0)
    yield put(loginSuccess(authResult));
    history.replace('/home');
  } catch (error) {
    console.error('Error handling login', error);
    yield put(loginError(error));
    history.replace('/home');
  }
}

function* startLogoutSaga({ payload: history}) {
  try {
    const { auth } = yield select();

    auth.auth0.logout({});
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutError(error));
    console.log('Error logging out the user', error)
  }
}

function promiseParseHash(auth0) {
  return new Promise((resolve, reject) => {
    auth0.parseHash((err, authResult) => {
      if (err) {
        reject(err)
      }
      resolve(authResult);
    })
  })
}

export function* watchStartLogin() {
  yield takeEvery(LOGIN_START, startLoginSaga);
}

export function* watchLoginCallback() {
  yield takeEvery(LOGIN_CALLBACK, loginCallbackSaga);
}

export function* watchStartLogout() {
  yield takeEvery(LOGOUT_START, startLogoutSaga);
}
