import { configureStore } from '@reduxjs/toolkit'
import { authReducer, logout } from './slices/authSlice'
import { authLogin, authSignup, adminLogin } from './thunks/authDetails'

const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export { store, authLogin, authSignup, adminLogin, logout }