import {LOAD_STORAGE, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_ERROR, LOGOUT_SUCCESS} from './auth.actions'
import auth from 'auth0-js';
import {AUTH_CONFIG} from "./auth.variables"

const auth0 = new auth.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://delijn-test.eu.auth0.com/api/v2/`,
  responseType: 'token id_token',
  scope: 'openid update:users update:users_app_metadata update:current_user_metadata'
});

const authReducer = (state = { auth0 }, {type, payload}) => {
  switch (type) {
    case LOAD_STORAGE: {
      return {
        ...state,
        expiresAt: localStorage.getItem('expires_at'),
        user: JSON.parse(localStorage.getItem('user_info')),
        accessToken: JSON.parse(localStorage.getItem('expires_at')),
      }
    }
    case LOGIN_SUCCESS: {
      const expiresAt = (payload.expiresIn * 1000) + new Date().getTime()
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('access_token', payload.accessToken)
      localStorage.setItem('id_token', payload.idToken)
      localStorage.setItem('expires_at', JSON.stringify(expiresAt))
      localStorage.setItem('user_info', JSON.stringify(payload.idTokenPayload))
      return {
        ...state,
        expiresAt,
        user: payload.idTokenPayload,
        accessToken: payload.accessToken,
      }
    }
    case LOGIN_ERROR: {
      console.error(payload)
      return {...state}
    }
    case LOGOUT_SUCCESS: {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('user_info');

      delete state.expiresAt
      delete state.user
      delete state.accessToken

      return {...state}
    }
    case LOGOUT_ERROR: {
      console.error(payload)
      return {...state}
    }
    default:
      return state
  }
}

export default authReducer
