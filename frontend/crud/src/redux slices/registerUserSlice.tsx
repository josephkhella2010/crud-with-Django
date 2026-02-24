import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../utilities/interfaces";

interface RegisterState {
  user: UserType | null;
}

const initialState: RegisterState = {
  user: null,
};

const registerUserSlice = createSlice({
  name: "registerUserSlice",
  initialState,
  reducers: {
    // 🔵 REQUEST (trigger saga)
    fetchRegisterUserRequest: (
      _state,
      _action: PayloadAction<Partial<UserType>>,
    ) => {},

    // 🟢 SUCCESS (API returned created user)
    fetchRegisterUserSuccess: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },

 
  },
});

export const {
  fetchRegisterUserRequest,
  fetchRegisterUserSuccess,
} = registerUserSlice.actions;

export default registerUserSlice.reducer;
