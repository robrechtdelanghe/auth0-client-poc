export const isAuthenticated = state =>
  state.auth &&
  state.auth.expiresAt && Date.now() < state.auth.expiresAt &&
  state.auth.accessToken !== undefined

export const user = state =>
  state.auth &&
  state.auth.user

export const expiresAt = state =>
  state.auth &&
  state.auth.expiresAt

export const nickname = state =>
  state.auth &&
  state.auth.user &&
  state.auth.user.nickname

export const lines = state =>
  state.auth &&
  state.auth.user &&
  state.auth.user.user_metadata &&
  state.auth.user.user_metadata.lines &&
  Object.values(state.auth.user.user_metadata.lines)