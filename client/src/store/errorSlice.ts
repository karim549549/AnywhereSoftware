import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  message: string | null;
  show: boolean;
}

const initialState: ErrorState = {
  message: null,
  show: false,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    showGlobalError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.show = true;
    },
    hideGlobalError: (state) => {
      state.message = null;
      state.show = false;
    },
  },
});

export const { showGlobalError, hideGlobalError } = errorSlice.actions;
export default errorSlice.reducer;
