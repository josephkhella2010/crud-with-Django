import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {};
const deleteUserItem = createSlice({
  name: "deleteUserItem",
  initialState,
  reducers: {
    fetchDeleteUserItemReqest: (
      _state,
      _action: PayloadAction<{ userId: number; itemId: number }>,
    ) => {},
  },
});

export const { fetchDeleteUserItemReqest } = deleteUserItem.actions;
export default deleteUserItem.reducer;
