import {ADD_LINE_SUCCESS, ADD_LINE_ERROR, DELETE_LINE_SUCCESS, DELETE_LINE_ERROR} from './data.actions'

const dataReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case ADD_LINE_SUCCESS: {
      return {
        ...state,
      }
    }
    case ADD_LINE_ERROR: {
      return {
        ...state,
      }
    }
    case DELETE_LINE_SUCCESS: {
      return {
        ...state,
      }
    }
    case DELETE_LINE_ERROR: {
      return {
        ...state,
      }
    }
    default:
      return state
  }
}

export default dataReducer
