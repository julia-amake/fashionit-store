import { createAsyncThunk } from '@reduxjs/toolkit';

export interface ThunkConfig<RejectValue = string> {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: RejectValue;
}

export const createAppAsyncThunk = <RejectValue = string>() =>
  createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: RejectValue;
  }>();
