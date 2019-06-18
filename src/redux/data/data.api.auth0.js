import auth0 from "auth0-js"
import {AUTH_CONFIG} from "../auth/auth.variables"

export function* updateLines(auth, lines) {
  const management = new auth0.Management({
    domain: AUTH_CONFIG.domain,
    token: auth.accessToken,
  });

  const result = yield promisePatchUserMedadata(management, auth.user.sub, { lines })

  return result;
}

function promisePatchUserMedadata(management, userid, metadata) {
  return new Promise((resolve, reject) => {
    management.patchUserMetadata(userid, metadata, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}