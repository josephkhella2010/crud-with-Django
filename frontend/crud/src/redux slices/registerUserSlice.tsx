import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../utilities/interfaces";

interface RegisterState {
  loading: boolean;
  error: string | null;
  user: UserType | null; // only store the newly created user
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  user: null,
};

const registerUserSlice = createSlice({
  name: "registerUserSlice",
  initialState,
  reducers: {
    // 🔵 REQUEST (trigger saga)
    fetchRegisterUserRequest: (
      state,
      _action: PayloadAction<Partial<UserType>>,
    ) => {
      state.loading = true;
      state.error = null;
    },

    // 🟢 SUCCESS (API returned created user)
    fetchRegisterUserSuccess: (state, action: PayloadAction<UserType>) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload; // ✅ store newly created user
    },

    // 🔴 FAILED
    fetchUserFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRegisterUserRequest,
  fetchRegisterUserSuccess,
  fetchUserFailed,
} = registerUserSlice.actions;

export default registerUserSlice.reducer;
