export const ADD_LINE_START = 'ADD_LINE_START'
export const ADD_LINE_SUCCESS = 'ADD_LINE_SUCCESS'
export const ADD_LINE_ERROR = 'ADD_LINE_ERROR'

export const DELETE_LINE_START = 'DELETE_LINE_START'
export const DELETE_LINE_SUCCESS = 'DELETE_LINE_SUCCESS'
export const DELETE_LINE_ERROR = 'DELETE_LINE_ERROR'

export const addLine = (linenumber, subscribed) => ({
  type: ADD_LINE_START,
  payload: { linenumber, subscribed },
})

export const addLineSuccess = (user_metadata) => ({
  type: ADD_LINE_SUCCESS,
  payload: user_metadata,
})

export const addLineError = (error) => ({
  type: ADD_LINE_ERROR,
  payload: error,
})

export const deleteLine = (linenumber) => ({
  type: DELETE_LINE_START,
  payload: linenumber,
})

export const deleteLineSuccess = (user_metadata) => ({
  type: DELETE_LINE_SUCCESS,
  payload: user_metadata,
})

export const deleteLineError = (error) => ({
  type: DELETE_LINE_ERROR,
  payload: error,
})
