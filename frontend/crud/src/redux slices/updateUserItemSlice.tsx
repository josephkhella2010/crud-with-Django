import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaskInputType } from "../utilities/interfaces";

interface initialStateType {
  loading: boolean;
  error: null | string;
}

const initialState: initialStateType = {
  loading: false,
  error: null,
};
const updateUserItemSlice = createSlice({
  name: " updateUserItemSlice",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUpdateUserItem: (
      state,
      _action: PayloadAction<{
        userId: number;
        itemId: number;
        updatedItem: TaskInputType;
      }>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setLoading, fetchUpdateUserItem, setError } =
  updateUserItemSlice.actions;
export default updateUserItemSlice.reducer;
