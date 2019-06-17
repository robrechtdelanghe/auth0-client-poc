import {CLEAR_TOAST, SET_TOAST_MESSAGE} from './toast.actions'

const toastReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case SET_TOAST_MESSAGE: {
      return {
        ...state,
        message: payload
      }
    }
    case CLEAR_TOAST: {
      const newState = { ...state }
      delete newState.message
      return newState
    }
    default:
      return state
  }
}

export default toastReducer
