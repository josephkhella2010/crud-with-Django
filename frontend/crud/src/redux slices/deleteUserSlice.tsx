import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginState } from "../utilities/interfaces";

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

const deleteUserSlice = createSlice({
  name: "deleteUserSlice",
  initialState,
  reducers: {
    loadingDeleteUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    setDeleteError: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
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
    },
  },
});
export const {
  loadingDeleteUser,
  setDeleteError,
  setDeleteUser,
  fetchDeleteUsersRequest,
} = deleteUserSlice.actions;
export default deleteUserSlice.reducer;
