import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { itemsType } from "../utilities/interfaces";

const initialState = {};
const addItemsSlice = createSlice({
  name: "addItemsSlice",
  initialState,
  reducers: {
    fetchAddItem: (
      _state,
      _action: PayloadAction<{ userId: number; item: itemsType }>,
    ) => {},
  },
});

export const { fetchAddItem } = addItemsSlice.actions;
export default addItemsSlice.reducer;
