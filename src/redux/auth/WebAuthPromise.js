import auth from 'auth0-js';
import {AUTH_CONFIG} from "./auth.variables"

class WebAuthPromise extends auth.WebAuth {
  parseHash() {
    return new Promise((resolve, reject) => {
      super.parseHash((err, authResult) => {
        if (err) {
          reject(err)
        }
        resolve(authResult);
      })
    })
  }

  authorize(options) {
    super.authorize(options)
  }

  logout(options) {
    super.logout(options)
  }

  changePassword(options) {
    return new Promise((resolve, reject) => {
      super.changePassword(options, (err, authResult) => {
        if (err) {
          reject(err)
        }
        resolve(authResult);
      })
    })
  }

  checkSession(options) {
    return new Promise((resolve, reject) => {
      super.checkSession(options, (err, authResult) => {
        if (err) {
          reject(err)
        }
        resolve(authResult);
      })
    })
  }

  userInfo(accessToken) {
    return new Promise((resolve, reject) => {
      this.client.userInfo(accessToken, (err, userInfo) => {
        if (err) {
          reject(err)
        }
        resolve(userInfo)
      })
    })
  }
}

export const createWebAuthPromise = (options) => {
  return new WebAuthPromise({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: 'https://www.delijn.be/auth0/api/interests' || 'https://delijn-test.eu.auth0.com/api/v2/',
    responseType: 'token id_token',
    scope: 'openid update:users update:users_app_metadata update:current_user_metadata',
    ...options
  });
}

export default WebAuthPromise