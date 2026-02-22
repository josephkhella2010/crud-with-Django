import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  LoginPayload,
  LoginState,
  UserType,
} from "../utilities/interfaces";

/* local storage */
const token = localStorage.getItem("token") || null; // raw string, no JSON.parse
const jsonUser = localStorage.getItem("user") || null;
const sortedUser = jsonUser ? JSON.parse(jsonUser) : null;

/* initial state */
interface LoginUserSliceType {
  loading: boolean;
  error: string | null;
  userInfo: LoginState;
}

/* initialstate */

const initialState: LoginUserSliceType = {
  loading: false,
  error: null,
  userInfo: {
    user: sortedUser,
    token: token,
  },
};

const loginUserSlice = createSlice({
  name: "loginUserSlice",
  initialState,
  reducers: {
    loadingLoginUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    setLoginError: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchLoginUserRequest: (state, _action: PayloadAction<LoginPayload>) => {
      state.loading = true;
      state.error = null;
    },
    setLoginUser: (
      state,
      action: PayloadAction<{ user: UserType; token: string }>,
    ) => {
      state.loading = false;
      state.error = null;

      const { user, token } = action.payload;

      state.userInfo.user = user;
      state.userInfo.token = token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    setlogoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      /*   state.userInfo.user = null;
      state.userInfo.token = null; */
      state.userInfo = {
        user: null,
        token: null,
      };
    },
    fetchDeleteUsersRequest: (state, _action: PayloadAction<number>) => {
      state.userInfo.user = null;
      state.userInfo.token = null;
    },
  },
});
export const {
  loadingLoginUser,
  setLoginError,
  setLoginUser,
  fetchLoginUserRequest,
  setlogoutUser,
} = loginUserSlice.actions;
export default loginUserSlice.reducer;
