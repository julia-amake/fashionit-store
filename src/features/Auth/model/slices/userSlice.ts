import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchProfile } from 'src/entities/Profile/api/profileApi';
import { LOCAL_STORAGE_TOKEN_KEY } from 'src/shared/consts/localStorage';
import { signInRTK, signUpRTK } from '../../api/authApi';
import { UserSchema } from '../types/userTypes';

export const userInitialState: UserSchema = {
  token: '',
  isLoading: false,
  error: '',
};

const handlers = {
  pending(state: UserSchema) {
    state.isLoading = true;
    state.error = '';
  },
  fulfilled(state: UserSchema) {
    state.isLoading = false;
    state.error = '';
  },
  rejected(state: UserSchema, error = '') {
    state.isLoading = false;
    state.error = error;
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    login: (state, { payload }: PayloadAction<string>) => {
      handlers.fulfilled(state);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, payload);
      state.token = payload;
    },
    logout: (state) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, userInitialState.token);
      state.token = userInitialState.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(signInRTK.matchPending, (state) => {
        handlers.pending(state);
      })
      .addMatcher(signInRTK.matchFulfilled, (state, { type, payload: { token } }) => {
        userSlice.caseReducers.login(state, { type, payload: token });
      })
      .addMatcher(signInRTK.matchRejected, (state, { payload }) => {
        handlers.rejected(state, payload as unknown as string);
      })
      .addMatcher(signUpRTK.matchPending, (state) => {
        handlers.pending(state);
      })
      .addMatcher(signUpRTK.matchFulfilled, (state, { type, payload: { token } }) => {
        userSlice.caseReducers.login(state, { type, payload: token });
      })
      .addMatcher(signUpRTK.matchRejected, (state, { payload }) => {
        handlers.rejected(state, payload as unknown as string);
      })
      .addMatcher(fetchProfile.matchRejected, (state) => {
        userSlice.caseReducers.logout(state);
      });
  },

  selectors: {
    selectToken: (state) => state.token,
  },
});

export const { login, logout } = userSlice.actions;
export const { selectToken } = userSlice.selectors;
export const userReducer = userSlice.reducer;
