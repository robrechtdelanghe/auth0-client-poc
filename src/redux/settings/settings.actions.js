export const LOAD_STORAGE = 'LOAD_STORAGE'
export const SET_LANGUAGE = 'SET_LANGUAGE'

export const loadStorage = () => ({
  type: LOAD_STORAGE
})


export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
})
