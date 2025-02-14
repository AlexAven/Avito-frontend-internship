/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { CurrentItemState, ExtraArgument, Store } from '../../types';

// Начальное состояние стейта текущего объявления
const initialState: CurrentItemState = {
  currentItem: null,
  status: 'idle',
  error: null,
};

// Получение объявления с сервера по ID
export const loadItemById = createAsyncThunk<any, number, { extra: ExtraArgument }>(
  '@@details/load-item-by-ID',
  (id, { extra: { client, api } }) => {
    return client.get(api.itemById(id));
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
      .addCase(loadItemById.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Ошибка загрузки данных';
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
// Селектор стейта текущего объявления целиком
export const selectDetails = (state: Store) => state.details;

// Селектор данных текущего выбранного объявления
export const selectCurrentCountry = (state: Store) => state.details.currentItem;
