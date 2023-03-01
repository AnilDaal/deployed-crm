import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const authLogin = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://api.pacifencesolutions.com/api/employee/login",
        {
          email: userData.email,
          password: userData.password,
        }
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSignup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://api.pacifencesolutions.com/api/employee/signup",
        {
          email: userData,
          password: userData.password,
        }
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const adminLogin = createAsyncThunk(
  "admin/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://api.pacifencesolutions.com/api/admin/login",
        {
          email: userData.email,
          password: userData.password,
        }
      );

      console.log(data);
      localStorage.setItem("adminToken", data);
      localStorage.setItem("isAdmin", true);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export { authLogin, authSignup, adminLogin };
