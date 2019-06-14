import { select, put, takeEvery } from 'redux-saga/effects';

import {
  LOGIN_START,
  LOGIN_CALLBACK,
  updateAuth,
  loginError,
  LOGOUT_START,
  logoutSuccess,
  logoutError,
  CHANGE_PASSWORD_START,
  CHECK_SESSION,
  UPDATE_USER_START,
  setRedirectUrl,
  updateUserInfo,
  sessionChecked, checkSession,
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
    console.error('Error logging out the user', error)
  }
}

function* loginCallbackSaga({ payload: history}) {
  try {
    const { auth } = yield select();
    const authResult = yield auth.auth0.parseHash()
    yield put(updateAuth(authResult));
    history.replace('/home');
  } catch (error) {
    console.error('Error handling login', error);
    yield put(loginError(error));
    history.replace('/home');
  }
}

function* startLogoutSaga({payload: redirectUrl}) {
  try {
    const { auth } = yield select();

    yield put(setRedirectUrl(redirectUrl))
    auth.auth0.logout({});
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutError(error));
    console.error('Error logging out the user', error)
  }
}

function* startChangePassword() {
  try {
    const { auth } = yield select()

    const result = yield auth.auth0.changePassword({
      connection: 'Username-Password-Authentication',
      email: auth.user.email,
    });

    console.log(result)
  } catch (error) {
    console.error('Error logging out the user', error)
  }
}

function* startCheckSession() {
  try {
    const { auth } = yield select()

    if (1*auth.expiresAt < Date.now()) {
      const checkResult = yield auth.auth0.checkSession({
        scope: 'openid profile email update:current_user_metadata user_metadata'
      })
      yield put(updateAuth(checkResult));
      yield put(sessionChecked())
      return
    }

    if (1*auth.expiresAt < (Date.now() + (45 * 1000))) {
      const checkResult = yield auth.auth0.checkSession({
        scope: 'openid profile email update:current_user_metadata user_metadata'
      })
      yield put(updateAuth(checkResult));
      yield put(sessionChecked())
      return
    }

    yield put(sessionChecked())

  } catch (error) {
    yield put(logoutError(error));
    console.error('Error logging out the user', error)
  }
}

function* startUpdateUser() {
  try {
    const { auth } = yield select()

    const userInfo = yield auth.auth0.userInfo(auth.accessToken)
    yield put(updateUserInfo(userInfo))
  } catch (error) {
    yield put(checkSession(error));
    console.warn('Error updating user data, check session', error)
  }
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

export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD_START, startChangePassword);
}

export function* watchCheckSession() {
  yield takeEvery(CHECK_SESSION, startCheckSession);
}

export function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER_START, startUpdateUser);
}
