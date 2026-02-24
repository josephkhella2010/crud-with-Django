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
  userInfo: LoginState;
}

/* initialstate */

const initialState: LoginUserSliceType = {
  userInfo: {
    user: sortedUser,
    token: token,
  },
};

const loginUserSlice = createSlice({
  name: "loginUserSlice",
  initialState,
  reducers: {
    fetchLoginUserRequest: (_state, _action: PayloadAction<LoginPayload>) => {},
    setLoginUser: (
      state,
      action: PayloadAction<{ user: UserType; token: string }>,
    ) => {
      const { user, token } = action.payload;

      state.userInfo.user = user;
      state.userInfo.token = token;

      localStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
    },
    setlogoutUser: (state) => {
      sessionStorage.removeItem("token");
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
export const { setLoginUser, fetchLoginUserRequest, setlogoutUser } =
  loginUserSlice.actions;
export default loginUserSlice.reducer;
