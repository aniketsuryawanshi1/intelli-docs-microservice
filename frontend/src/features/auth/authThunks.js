import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../utils/api-handler";
import { clearUser } from "./authSlice";

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("register/", userData);
      // Expecting { user, access, refresh }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Registration failed"
      );
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("login/", credentials);
      // Expecting { user, access, refresh }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || "Login failed");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, dispatch }) => {
    try {
      const { refreshToken } = getState().auth;
      if (refreshToken) {
        await AxiosInstance.post("logout/", { refresh_token: refreshToken });
      }
    } catch {
      // Ignore errors on logout
    }
    dispatch(clearUser());
  }
);
