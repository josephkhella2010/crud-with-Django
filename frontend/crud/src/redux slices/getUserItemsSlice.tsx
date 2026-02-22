import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  loading: boolean;
  error: string | null;
}

const initialState: initialStateType = {
  loading: false,
  error: null,
};

const getUserItemsSlice = createSlice({
  name: "getUserItemsSlice",
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
    fetchUserItems: (state, _action: PayloadAction<{ userId: number }>) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { setLoading, setError, fetchUserItems } =
  getUserItemsSlice.actions;
export default getUserItemsSlice.reducer;
