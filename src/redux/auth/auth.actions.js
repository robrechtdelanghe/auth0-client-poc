export const LOAD_STORAGE = 'LOAD_STORAGE'
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_CALLBACK = 'LOGIN_CALLBACK'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_START = 'LOGOUT_START'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export const loadStorage = () => ({
  type: LOAD_STORAGE
})

export const loginStart = () => ({
  type: LOGIN_START
})

export const loginCallback = () => ({
  type: LOGIN_CALLBACK,
  payload: true
})

export const loginSuccess = (authResult) => ({
  type: LOGIN_SUCCESS,
  payload: authResult
})

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error
})

export const logoutStart = (error) => ({
  type: LOGOUT_START,
})

export const logoutSuccess = (error) => ({
  type: LOGOUT_SUCCESS,
})

export const logoutError = (error) => ({
  type: LOGOUT_ERROR,
})