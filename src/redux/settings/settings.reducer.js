import {SET_LANGUAGE, SET_API_SOURCE, LOAD_SETTINGS_STORAGE} from './settings.actions'
import {API_SOURCE_AUTH0} from "../../constants"

const initialState = {
  language: 'nl',
  apiSource: API_SOURCE_AUTH0,
  isStarted: false
}

const settingsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOAD_SETTINGS_STORAGE: {
      return {
        ...state,
        language: localStorage.getItem('language') || state.language,
        apiSource: localStorage.getItem('api_source') || state.apiSource,
        storageLoaded: true,
      }
    }
    case SET_LANGUAGE: {
      localStorage.setItem('language', payload)
      return {
        ...state,
        language: payload,
      }
    }
    case SET_API_SOURCE: {
      localStorage.setItem('api_source', payload)
      return {
        ...state,
        apiSource: payload,
      }
    }
    default:
      return state
  }
}

export default settingsReducer
