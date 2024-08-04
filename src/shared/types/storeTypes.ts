import { createAsyncThunk } from '@reduxjs/toolkit';
import { type AxiosInstance } from 'axios';
import { AppDispatch, RootState } from 'src/app/store/store';

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<RejectValue = string> {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: RejectValue;
  extra: ThunkExtraArg;
}

export const createAppAsyncThunk = <RejectValue = string>() =>
  createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: RejectValue;
    extra: ThunkExtraArg;
  }>();
