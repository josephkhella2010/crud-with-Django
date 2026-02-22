import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { itemsType } from "../utilities/interfaces";
interface initialStateType {
  loading: boolean;
  error: string | null;
}
const initialState: initialStateType = {
  loading: false,
  error: null,
};
const addItemsSlice = createSlice({
  name: "addItemsSlice",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAddItem: (
      state,
      _action: PayloadAction<{ userId: number; item: itemsType }>,
    ) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { setLoading, setError, fetchAddItem } = addItemsSlice.actions;
export default addItemsSlice.reducer;
