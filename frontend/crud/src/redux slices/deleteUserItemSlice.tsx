import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface initialStateType {
  loading: boolean;
  error: string | null;
}
const initialState: initialStateType = {
  loading: false,
  error: null,
};
const deleteUserItem = createSlice({
  name: "deleteUserItem",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.loading = true;
      state.error = action.payload;
    },
    fetchDeleteUserItemReqest: (
      state,
      _action: PayloadAction<{ userId: number; itemId: number }>,
    ) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, fetchDeleteUserItemReqest } =
  deleteUserItem.actions;
export default deleteUserItem.reducer;
