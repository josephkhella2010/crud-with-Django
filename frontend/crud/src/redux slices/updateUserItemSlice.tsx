import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaskInputType } from "../utilities/interfaces";

const initialState = {};
const updateUserItemSlice = createSlice({
  name: " updateUserItemSlice",
  initialState,
  reducers: {
    fetchUpdateUserItem: (
      _state,
      _action: PayloadAction<{
        userId: number;
        itemId: number;
        updatedItem: TaskInputType;
      }>,
    ) => {},
  },
});

export const { fetchUpdateUserItem } = updateUserItemSlice.actions;
export default updateUserItemSlice.reducer;
