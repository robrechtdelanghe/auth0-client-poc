export const CREATE_TOAST = 'CREATE_TOAST'
export const SET_TOAST_MESSAGE = 'SET_TOAST_MESSAGE'
export const CLEAR_TOAST = 'CLEAR_TOAST'


export const createToast = (message, time) => ({
  type: CREATE_TOAST,
  payload: { message, time },
})

export const setToastMessage = (message) => ({
  type: SET_TOAST_MESSAGE,
  payload: message,
})

export const clearToast = () => ({
  type: CLEAR_TOAST,
})
