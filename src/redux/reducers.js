import { combineReducers } from 'redux'

import authReducer from './auth/auth.reducer'
import settingsReducer from './settings/settings.reducer'
import toastReducer from './toast/toast.reducer'

export default combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  toast: toastReducer,
})
