import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginState } from "../utilities/interfaces";

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

const deleteUserSlice = createSlice({
  name: "deleteUserSlice",
  initialState,
  reducers: {
    /*   setlogoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.userInfo.user = null;
      state.userInfo.token = null;
    }, */
    setDeleteUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.userInfo.user = null;
      state.userInfo.token = null;
    },
    fetchDeleteUsersRequest: (state, _action: PayloadAction<number>) => {
      state.userInfo.user = null;
      state.userInfo.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
export const { setDeleteUser, fetchDeleteUsersRequest } =
  deleteUserSlice.actions;
export default deleteUserSlice.reducer;
