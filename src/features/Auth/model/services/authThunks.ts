import { AxiosError, isAxiosError } from 'axios';
import { initializeCart } from 'src/entities/Cart';
import { productApi, resetCatalog } from 'src/entities/Product';
import { fetchProfile, profileApi } from 'src/entities/Profile';
import { SessionResponse } from 'src/entities/Session';
import { $api } from 'src/shared/api/api';
import { rtkApi } from 'src/shared/api/rtkApi';
import { COMMAND_ID } from 'src/shared/consts/api';
import { LOCAL_STORAGE_TOKEN_KEY } from 'src/shared/consts/localStorage';
import { createAppAsyncThunk } from 'src/shared/lib/utils/asyncThunk';
import { AuthFormValues } from '../../ui/AuthForm/AuthForm';
import { resetAuth } from '../slices/authSlice';
import { AuthMode } from '../types/authTypes';

export const authInitialize = createAppAsyncThunk()(
  'auth/initialize',
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || '';
    if (!token) return;
    try {
      const profile = await dispatch(fetchProfile.initiate()).unwrap();
      if (!profile) return rejectWithValue('No profile');

      dispatch(resetCatalog());
      dispatch(productApi.util.invalidateTags(['Category', 'Cart', 'Order']));
      return profile;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const login = createAppAsyncThunk()(
  'auth/login',
  async ({ values, mode }: { values: AuthFormValues; mode: AuthMode }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const isSignIn = mode === 'signIn';

    try {
      const response = await $api.post<SessionResponse>(isSignIn ? '/signin' : 'signup', {
        ...values,
        ...(isSignIn ? {} : { commandId: COMMAND_ID }),
      });
      if (!response.data) return rejectWithValue('Auth error');

      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.data.token);
      dispatch(profileApi.util.upsertQueryData('fetchProfile', undefined, response.data.profile));
      dispatch(resetCatalog());
      dispatch(productApi.util.resetApiState());
      dispatch(initializeCart());
      dispatch(productApi.util.invalidateTags(['Category', 'Cart', 'Order']));

      return response.data;
    } catch (err) {
      const error = err as Error | AxiosError<Response>;
      return rejectWithValue(
        isAxiosError(error)
          ? error.response?.data.errors[0]?.message || error.message
          : 'Auth error'
      );
    }
  }
);

export const logout = createAppAsyncThunk()('auth/logout', (_, { dispatch }) => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  dispatch(resetAuth());
  dispatch(resetCatalog());
  dispatch(rtkApi.util.resetApiState());
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});
