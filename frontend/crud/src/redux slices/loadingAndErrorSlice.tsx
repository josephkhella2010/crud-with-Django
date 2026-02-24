import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { initialStateType } from "../utilities/interfaces";

const initialState: initialStateType = {
  loading: false,
  error: null,
};
const loadingAndErrorSlice = createSlice({
  name: "loadingAndErrorSlice",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { setLoading, setError, clearLoading } =
  loadingAndErrorSlice.actions;
export default loadingAndErrorSlice.reducer;
