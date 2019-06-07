import {SET_LANGUAGE} from './settings.actions'
import {LOAD_STORAGE} from "../auth/auth.actions"

const settingsReducer = (state = {language: 'nl'}, {type, payload}) => {
  switch (type) {
    case LOAD_STORAGE: {
      return {
        ...state,
        language: localStorage.getItem('language') || state.language,
      }
    }
    case SET_LANGUAGE: {
      localStorage.setItem('language', payload)
      return {
        ...state,
        language: payload,
      }
    }
    default:
      return state
  }
}

export default settingsReducer
