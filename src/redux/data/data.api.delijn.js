import axios from 'axios'
import {API_DELIJN} from "../../constants"

export function* updateLines(auth, lines) {
  const response = yield axios.post(`${API_DELIJN}/users/user/lines`, lines, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.accessToken}`
    },
  })
  if (response.status !== 200) {
    throw response
  }

  const user = response.data
  user.user_metadata = user.userMetadata
  delete user.userMetadata

  return user
}