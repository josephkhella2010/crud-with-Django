import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../utilities/interfaces";

type UpdateUserPayload = {
  id: number;
  data: UserType;
};

const initialState = {};

const updateUserSlice = createSlice({
  name: "updateUserSlice",
  initialState,
  reducers: {
    fetchUpdateUserRequest: (
      _state,
      _action: PayloadAction<UpdateUserPayload>,
    ) => {},
  },
});

export const { fetchUpdateUserRequest } = updateUserSlice.actions;

export default updateUserSlice.reducer;
