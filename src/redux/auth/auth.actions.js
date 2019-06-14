export const LOAD_AUTH_STORAGE = 'LOAD_AUTH_STORAGE'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_CALLBACK = 'LOGIN_CALLBACK'
export const UPDATE_AUTH = 'UPDATE_AUTH'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const LOGOUT_START = 'LOGOUT_START'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export const CHANGE_PASSWORD_START = 'CHANGE_PASSWORD_START'

export const CHECK_SESSION = 'CHECK_SESSION'
export const SESSION_CHECKED = 'SESSION_CHECKED'

export const UPDATE_USER_START = 'UPDATE_USER_START'

export const SET_REDIRECT_URL = 'SET_REDIRECT_URL'

export const START_SET_API = 'START_SET_API'

export const loadAuthStorage = () => ({
  type: LOAD_AUTH_STORAGE
})

export const loginStart = () => ({
  type: LOGIN_START
})

export const loginCallback = () => ({
  type: LOGIN_CALLBACK,
  payload: true
})

export const updateAuth = (authResult) => ({
  type: UPDATE_AUTH,
  payload: authResult
})

export const updateUserInfo = (userInfo) => ({
  type: UPDATE_USER_INFO,
  payload: userInfo
})

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error
})

export const logoutStart = (redirectUrl) => ({
  type: LOGOUT_START,
  payload: redirectUrl,
})

export const logoutSuccess = (error) => ({
  type: LOGOUT_SUCCESS,
})

export const logoutError = (error) => ({
  type: LOGOUT_ERROR,
})

export const changePassword = () => ({
  type: CHANGE_PASSWORD_START,
})

export const checkSession = (forceUpdate) => ({
  type: CHECK_SESSION,
  payload: { forceUpdate },
})

export const sessionChecked = () => ({
  type: SESSION_CHECKED,
})

export const updateUser = () => ({
  type: UPDATE_USER_START,
})

export const setRedirectUrl = (redirectUrl) => ({
  type: SET_REDIRECT_URL,
  payload: redirectUrl,
})


export const startSetApi = (apiSource) => ({
  type: START_SET_API,
  payload: apiSource
})
