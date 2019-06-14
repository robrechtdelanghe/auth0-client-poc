import axios from 'axios'
import {API_DELIJN} from "../../constants"

export function* updateLines(auth, lines) {
  const response = yield axios.post(`${API_DELIJN}/api/lines`, lines, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.accessToken}`
    },
  })
  if (response.status !== 200) {
    throw response
  }
  return response.data
}