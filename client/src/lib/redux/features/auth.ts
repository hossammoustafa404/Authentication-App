import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  user: {
    firstName: string;
    avatar: null | string;
    role: "super_admin" | "admin" | "customer";
    verified: boolean;
  } | null;
  accessToken: null | string;
}

let initialState: AuthState = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userAuthenticated: (state, action) => {
      return (state = action.payload);
    },
    userLogout: (state) => {
      return (state = { user: null, accessToken: null });
    },
    setAuthUser: (state, { payload }) => {
      state.user = payload;
    },
    userVerified: (state) => {
      if (state.user) {
        state.user.verified = true;
      }
    },
    accessTokenRefreshed: (state, { payload }) => {
      state.accessToken = payload;
    },
  },
});

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const {
  userAuthenticated,
  userLogout,
  accessTokenRefreshed,
  setAuthUser,
  userVerified,
} = authSlice.actions;
export default authSlice.reducer;
