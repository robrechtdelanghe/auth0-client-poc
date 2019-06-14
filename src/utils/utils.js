import {API_SOURCE_DELIJN} from "../constants"

export const wait = (time) => {
  return new Promise(resolve => {
    setTimeout(() => { resolve()}, time)
  })
}

export const getApiUrl = apiSource =>
  apiSource === API_SOURCE_DELIJN ? 'https://www.delijn.be/auth0/api/interests' :
    'https://delijn-test.eu.auth0.com/api/v2/'