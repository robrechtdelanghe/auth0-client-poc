import {
  LOAD_AUTH_STORAGE,
  UPDATE_AUTH,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  CHANGE_PASSWORD_START,
  SET_REDIRECT_URL,
  UPDATE_USER_INFO,
  SESSION_CHECKED
} from './auth.actions'
import {ADD_LINE_SUCCESS, DELETE_LINE_SUCCESS} from './../data/data.actions'
import {createWebAuthPromise} from "./WebAuthPromise"
import {getApiUrl} from "../../utils/utils"
import {API_SOURCE_AUTH0} from "../../constants"

const auth0 = createWebAuthPromise({audience: getApiUrl(API_SOURCE_AUTH0)});

const authReducer = (state = { auth0 }, {type, payload}) => {
  switch (type) {
    case LOAD_AUTH_STORAGE: {
      return {
        ...state,
        expiresAt: localStorage.getItem('expires_at'),
        user: JSON.parse(localStorage.getItem('user_info')),
        accessToken: localStorage.getItem('access_token'),
        redirectUrl: localStorage.getItem('redirectUrl'),
        storageLoaded: true,
      }
    }
    case UPDATE_AUTH: {
      const expiresAt = (payload.expiresIn * 1000) + new Date().getTime()
      const user = payload.idTokenPayload

      localStorage.setItem('access_token', payload.accessToken)
      localStorage.setItem('id_token', payload.idToken)
      localStorage.setItem('expires_at', JSON.stringify(expiresAt))
      localStorage.setItem('user_info', JSON.stringify(getUserInfo(user)))
      return {
        ...state,
        expiresAt,
        user,
        accessToken: payload.accessToken,
      }
    }
    case UPDATE_USER_INFO: {
      localStorage.setItem('user_info', JSON.stringify(getUserInfo(payload)))
      return {
        ...state,
        user: payload,
      }
    }
    case LOGIN_ERROR: {
      console.error(payload)
      return {...state}
    }
    case LOGOUT_SUCCESS: {
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
    case ADD_LINE_SUCCESS: {
      const user = state.user
      const userMetadata = user.user_metadata || {}

      userMetadata.lines = payload;
      localStorage.setItem('user_info', JSON.stringify(user))

      return {
        ...state,
        user,
      }
    }
    case DELETE_LINE_SUCCESS: {
      const user = state.user
      const userMetadata = user.user_metadata || {}
      userMetadata.lines = payload

      localStorage.setItem('user_info', JSON.stringify(user))

      return {
        ...state,
        user,
      }
    }
    case CHANGE_PASSWORD_START: {
      return {
        ...state,
      }
    }
    case SET_REDIRECT_URL: {
      localStorage.setItem('redirectUrl', payload)
      return {
        ...state,
        redirectUrl: payload,
      }
    }
    case SESSION_CHECKED: {
      return {
        ...state,
        sessionChecked: true,
      }
    }
    default:
      return state
  }
}

function getUserInfo(user) {
  user.user_metadata = user['https://www.delijn.be/metadata']
  delete user['https://www.delijn.be/metadata']
  return user
}

export default authReducer
