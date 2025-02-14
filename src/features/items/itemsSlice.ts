/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { ItemState, ExtraArgument, ItemWithDetails, Store } from '../../types';
import { selectSearch, selectCategory } from '../controls/controlsSlice';

// Начальное состояние стейта объявлений
const initialState: ItemState = {
  entities: {},
  ids: [],
  status: 'idle',
  error: null,
};

// Получения списка объявлений с сервера
export const loadItems = createAsyncThunk<any, void, { extra: ExtraArgument }>(
  '@@items/load-all-items',
  (_, { extra: { client, api } }) => {
    return client.get(api.ALL_ITEMS);
  },
);

// Создание объявления и отправка на сервер
export const createItem = createAsyncThunk<void, ItemWithDetails, { extra: ExtraArgument }>(
  '@@items/create-item',
  (item, { extra: { client, api } }) => {
    client.post(api.ALL_ITEMS, item);
  },
);

// Редактирование существующего объявления и отправка на сервер
export const updateItem = createAsyncThunk<void, ItemWithDetails, { extra: ExtraArgument }>(
  '@@items/update-item',
  (item, { extra: { client, api } }) => {
    client.put(api.itemById(item.id!), item);
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
        state.error = action.error.message || 'Ошибка загрузки данных';
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

// Селекторы:
// Селектор стейта
export const selectItemsState = (state: Store) => state.items;

// Селектор всех объявлений в стейте
export const selectItemsEntities = (state: Store) => state.items.entities;

// Селектор списка объявлений с учетом фильтров и текста поиска
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

// Селектор пагинации
export const selectPagination = (state: Store) => state.pagination;

// Селектор списка объявлений для рендера на одной текущей стринице
export const selectPaginatedProducts = createSelector(
  [selectFilteredItems, selectPagination],
  (items, pagination) => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return items.slice(startIndex, endIndex);
  },
);
