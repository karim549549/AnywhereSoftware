import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUser: (state, action: PayloadAction<{ id: string; username: string; email: string }>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setAuthTokens, setUser, clearAuth } = userSlice.actions;
export default userSlice.reducer;
