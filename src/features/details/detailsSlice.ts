/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { CurrentItemState, ExtraArgument, Store } from '../../types';

const initialState: CurrentItemState = {
  currentItem: null,
  status: 'idle',
  error: null,
};

export const loadItemById = createAsyncThunk<any, number, { extra: ExtraArgument }>(
  '@@details/load-item-by-ID',
  (id, { extra: { client, api } }) => {
    return client.get(api.loadItemById(id));
  },
);

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItemById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadItemById.fulfilled, (state, { payload }) => {
        const { data } = payload;
        state.status = 'received';
        state.error = null;
        state.currentItem = data;
      });
  },
});

export const detailsReducer = detailsSlice.reducer;
export const { clearDetails } = detailsSlice.actions;

// Селекторы
export const selectCurrentCountry = (state: Store) => state.details.currentItem;
export const selectDetails = (state: Store) => state.details;
