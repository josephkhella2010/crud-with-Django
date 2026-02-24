import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {};

const getUserItemsSlice = createSlice({
  name: "getUserItemsSlice",
  initialState,
  reducers: {
    fetchUserItems: (_state, _action: PayloadAction<{ userId: number }>) => {},
  },
});

export const { fetchUserItems } = getUserItemsSlice.actions;
export default getUserItemsSlice.reducer;
