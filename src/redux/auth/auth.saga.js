import { select, put, takeEvery, all } from 'redux-saga/effects';

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
  sessionChecked, checkSession, START_SET_API,
} from './auth.actions'
import {getApiUrl} from "../../utils/utils"
import {setApi} from "../settings/settings.actions"
import {createToast} from "../toast/toast.actions"

function* startLoginSaga() {
  try {
    const { auth, settings } = yield select();
    auth.auth0.authorize({
      scope: 'openid profile email update:current_user_metadata user_metadata',
      language: settings.language,
      audience: getApiUrl(settings.apiSource),
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
    history.replace('/');
  } catch (error) {
    console.error('Error handling login', error);
    yield put(loginError(error));
    history.replace('/');
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

    yield put(createToast(result))
    console.log(result)
  } catch (error) {
    console.error('Error logging out the user', error)
  }
}

function* startCheckSession({ payload }) {
  try {
    const { auth, settings } = yield select()

    if (auth.accessToken) {
      if ((payload && payload.forceUpdate) || 1 * auth.expiresAt < (Date.now() + (45 * 1000))) {
        const checkResult = yield auth.auth0.checkSession({
          scope: 'openid profile email update:current_user_metadata user_metadata',
          audience: getApiUrl(settings.apiSource),
        })
        yield put(updateAuth(checkResult));
        yield put(sessionChecked())
        return
      }
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

function* startSetApi({ payload }) {
  try {

    yield put(setApi(payload))
    yield put(checkSession(true))
  } catch (error) {
    console.error('Error changing api sources', error)
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

export function* watchStartSetApi() {
  yield takeEvery(START_SET_API, startSetApi);
}

export default function* authSagas() {
  yield all([
    watchStartLogin(),
    watchLoginCallback(),
    watchStartLogout(),
    watchChangePassword(),
    watchCheckSession(),
    watchUpdateUser(),
    watchStartSetApi(),
  ])
}