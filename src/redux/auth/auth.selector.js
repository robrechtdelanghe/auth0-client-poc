export const isAuthenticated = state =>
  state.auth &&
  state.auth.expiresAt && (() => { console.log(state); return Date.now() < state.auth.expiresAt; }) &&
  state.auth.accessToken !== undefined

export const nickname = state =>
  state.auth &&
  state.auth.user &&
  state.auth.user.nickname