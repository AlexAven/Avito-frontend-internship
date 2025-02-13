/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { ItemState, ExtraArgument, ItemWithDetails, Store } from '../../types';
import { selectSearch, selectCategory } from '../controls/controlsSlice';

const initialState: ItemState = {
  entities: {},
  ids: [],
  status: 'idle',
  error: null,
};

export const loadItems = createAsyncThunk<any, void, { extra: ExtraArgument }>(
  '@@items/load-all-items',
  (_, { extra: { client, api } }) => {
    return client.get(api.ALL_ITEMS);
  },
);

export const createItem = createAsyncThunk<void, ItemWithDetails, { extra: ExtraArgument }>(
  '@@items/create-item',
  (item, { extra: { client, api } }) => {
    console.log('THUNK', item);
    client.post(api.ALL_ITEMS, item);
  },
);

export const updateItem = createAsyncThunk<void, ItemWithDetails, { extra: ExtraArgument }>(
  '@@items/update-item',
  (item, { extra: { client, api } }) => {
    client.put(api.loadItemById(item.id!), item);
  },
);

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Неизвестная ошибка';
      })
      .addCase(loadItems.fulfilled, (state, { payload }) => {
        const { data } = payload;
        state.status = 'received';
        state.error = null;
        state.ids = data.map((item: ItemWithDetails) => item.id);
        data.forEach((item: ItemWithDetails) => (state.entities[item.id!] = item));
      });
  },
});

export const itemsReducer = itemSlice.reducer;

// Селекторы объявлений
export const selectItemsEntities = (state: Store) => state.items.entities;

export const selectFilteredItems = createSelector(
  [selectItemsEntities, selectSearch, selectCategory],
  (entities, search, category) => {
    const searchLower = search.toLowerCase();

    return Object.values(entities).filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) &&
        (category === 'Все' || item.type === category),
    );
  },
);
