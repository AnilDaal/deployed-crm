import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, authLogin, authSignup } from "../thunks/authDetails";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem("adminToken"),
    isLoggedIn: Boolean(localStorage.getItem('adminToken')),
    isLoading: false,
    error: null,
    isAdmin: localStorage.getItem('isAdmin')
  },
  reducers: {
    logout(state, action) {
      localStorage.removeItem('adminToken')
      state.token = null;
      state.isLoggedIn = false
      localStorage.removeItem('isAdmin')
      state.isAdmin = false
    }
  },
  extraReducers(builder) {
    //FIXME:  login
    builder.addCase(authLogin.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.error = null;
      state.token = action.payload
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload
    })

    //TODO:  signup
    builder.addCase(authSignup.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(authSignup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.token = action.payload
      state.error = null;
    });
    builder.addCase(authSignup.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })

    //TODO: admin login
    builder.addCase(adminLogin.pending, (state, action) => {
      state.isLoading = true;

    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.token = action.payload
      state.error = null;
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions 