import { createSlice } from '@reduxjs/toolkit';
import { authInitialize, login } from '../services/authThunks';
import { AuthSchema } from '../types/authTypes';

const initialState: AuthSchema = {
  isAuth: false,
  isLoading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isAuth = false;
      state.isLoading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authInitialize.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(authInitialize.fulfilled, (state, { payload }) => {
        state.isAuth = !!payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(authInitialize.rejected, (state: AuthSchema, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Auth error';
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuth = true;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Auth error';
      });
  },
  selectors: {
    selectIsAuth: (state) => state.isAuth,
    selectAuthIsLoading: (state) => state.isLoading,
    selectAuthError: (state) => state.error,
  },
});

export const { selectIsAuth, selectAuthError, selectAuthIsLoading } = authSlice.selectors;
export const { resetAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
