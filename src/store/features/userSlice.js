import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'api/api';

const initialState = {
  users: [],
  profile: [],
  successMessage: "",
  errorMessage: "",
  role: "",
};


export const registerUserAsync = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    try {
      const response = await axiosInstance.post(`/${data['role']}/register`, data['user']);
      console.log(response.data)
      localStorage.setItem("username", data["user"]['username']);
      localStorage.setItem("email", data['user']["email"]);
      localStorage.setItem("role", data['role'])
      return response.data
    } catch (err) {
      throw new Error(err);
    }
  }
)

export const loginAsync = createAsyncThunk(
  "user/loginUser",
  async (user) => {
    try {
      const response = await axiosInstance.post("/login", user);
      localStorage.setItem("username", response.data.data["username"]);
      localStorage.setItem("email", response.data.data["email"]);
      localStorage.setItem("role", response.data.role);
      return response.data
    } catch (err) {
      throw new Error(err);
    }
  }
)

export const getProfileAsync = createAsyncThunk(
  "user/getProfile",
  async (username) => {
    try {
      const response = await axiosInstance.get(`/userprofile/username?username=${username}`)

      return response.data.data
    } catch (err) {
      throw new Error(err);
    }
  }
)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state = []
    },
  },
  extraReducers: {
    [registerUserAsync.fulfilled]: (state, action) => {
      state.successMessage = action.payload.successMessage
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.users = action.payload.data
      state.successMessage = action.payload.successMessage
      state.role = action.payload.role
    },
    [getProfileAsync.fulfilled]: (state, action) => {
      state.profile = action.payload
    },
  }
});

export const { logoutUser } = userSlice.actions;


export default userSlice.reducer  