import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AppSchema } from '../types/appTypes';

const initialState: AppSchema = {
  isInited: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAppInited: (state, { payload }: PayloadAction<boolean>) => {
      state.isInited = payload;
    },
  },
  selectors: {
    selectIsAppInited: (state) => state.isInited,
  },
});

export const { setIsAppInited } = appSlice.actions;
export const { selectIsAppInited } = appSlice.selectors;
export const appReducer = appSlice.reducer;
