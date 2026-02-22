import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../utilities/interfaces";

type UpdateUserPayload = {
  id: number;
  data: UserType;
};

interface initialStateType {
  loading: boolean;
  error: null | string;
}

const initialState: initialStateType = {
  loading: false,
  error: null,
};

const updateUserSlice = createSlice({
  name: "updateUserSlice",
  initialState,
  reducers: {
    fetchLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchUpdateUserRequest: (
      state,
      _action: PayloadAction<UpdateUserPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { fetchLoading, fetchError, fetchUpdateUserRequest } =
  updateUserSlice.actions;

export default updateUserSlice.reducer;
