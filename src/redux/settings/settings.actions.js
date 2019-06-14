export const LOAD_SETTINGS_STORAGE = 'LOAD_SETTINGS_STORAGE'
export const SET_LANGUAGE = 'SET_LANGUAGE'
export const SET_API_SOURCE = 'SET_API_SOURCE'

export const loadSettingsStorage = () => ({
  type: LOAD_SETTINGS_STORAGE
})

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
})

export const setApi = (apiSource) => ({
  type: SET_API_SOURCE,
  payload: apiSource
})
