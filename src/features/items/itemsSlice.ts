/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import {
  ItemState,
  ExtraArgument,
  ItemWithDetails,
  Store,
  ItemTypes,
  RealEstateSpecific,
  AutoSpecific,
  ServiceSpecific,
} from '../../types';
import { selectSearch, selectCategory, selectFilters } from '../controls/controlsSlice';

// Начальное состояние стейта объявлений
const initialState: ItemState = {
  entities: {},
  ids: [],
  status: 'idle',
  error: null,
  ui: {
    status: 'idle',
    message: null,
    error: null,
  },
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
    return client.post(api.ALL_ITEMS, item);
  },
);

// Редактирование существующего объявления и отправка на сервер
export const updateItem = createAsyncThunk<void, ItemWithDetails, { extra: ExtraArgument }>(
  '@@items/update-item',
  (item, { extra: { client, api } }) => {
    return client.put(api.itemById(item.id!), item);
  },
);

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearUi: (state) => {
      state.ui = initialState.ui;
    },
  },
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
      })
      .addCase(createItem.pending, (state) => {
        state.ui.status = 'loading';
      })
      .addCase(createItem.rejected, (state) => {
        state.ui.status = 'rejected';
        state.ui.error = 'Ошибка при создании';
      })
      .addCase(createItem.fulfilled, (state) => {
        state.ui.status = 'received';
        state.ui.message = 'Успешно создано!';
      })
      .addCase(updateItem.pending, (state) => {
        state.ui.status = 'loading';
      })
      .addCase(updateItem.rejected, (state) => {
        state.ui.status = 'rejected';
        state.ui.error = 'Ошибка при редактировании';
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.ui.status = 'received';
        state.ui.message = 'Успешно отредактировано!';
      });
  },
});

export const { clearUi } = itemSlice.actions;
export const itemsReducer = itemSlice.reducer;

// Селекторы:
// Селектор стейта
export const selectItemsState = (state: Store) => state.items;

// Селектор всех объявлений в стейте
export const selectItemsEntities = (state: Store) => state.items.entities;

// Селектор списка объявлений по текущей категории
export const selectCategorizedEntities = createSelector(
  [selectItemsEntities, selectCategory],
  (entities, category) => {
    return Object.values(entities).filter((item) => category === 'Все' || item.type === category);
  },
);

// Селектор списка объявлений с учетом фильтров и поиска
export const selectFilteredItems = createSelector(
  [selectItemsEntities, selectSearch, selectCategory, selectFilters],
  (entities, search, category, filters) => {
    const searchLower = search.toLowerCase();

    return Object.values(entities).filter((item) => {
      // Фильтрация категории
      if (category !== 'Все' && item.type !== category) return false;

      // Общая фильтрация по строке поиска
      if (!item.name.toLowerCase().includes(searchLower)) return false;

      // Фильтрация по фильтрам выбранной категории
      if (category === ItemTypes.REAL_ESTATE) {
        const { propertyType, minArea, maxArea, rooms, minPrice, maxPrice } =
          filters[ItemTypes.REAL_ESTATE];
        const realEstate = item as ItemWithDetails & RealEstateSpecific;

        // Логика фильтров категории "Недвижимость"
        if (propertyType && realEstate.propertyType !== propertyType) return false;
        if (minArea > 0 && realEstate.area < minArea) return false;
        if (maxArea > 0 && realEstate.area > maxArea) return false;
        if (rooms > 0 && realEstate.rooms !== rooms) return false;
        if (minPrice > 0 && realEstate.price < minPrice) return false;
        if (maxPrice > 0 && realEstate.price > maxPrice) return false;
      }
      // Логика фильтров категории "Авто"
      if (category === ItemTypes.AUTO) {
        const { brand, model, minYear, maxYear, minMileage, maxMileage } = filters[ItemTypes.AUTO];
        const auto = item as ItemWithDetails & AutoSpecific;

        if (brand && auto.brand !== brand) return false;
        if (model && !auto.model.toLocaleLowerCase().startsWith(model.toLocaleLowerCase()))
          return false;
        if (minYear > 0 && auto.year < minYear) return false;
        if (maxYear > 0 && auto.year > maxYear) return false;
        if (minMileage > 0 && auto.mileage < minMileage) return false;
        if (maxMileage > 0 && auto.mileage > maxMileage) return false;
      }
      // Логика фильтров категории "Услуги"
      if (category === ItemTypes.SERVICES) {
        const { serviceType, minExperience, maxExperience, minCost, maxCost } =
          filters[ItemTypes.SERVICES];
        const service = item as ItemWithDetails & ServiceSpecific;

        if (serviceType && service.serviceType !== serviceType) return false;
        if (minExperience > 0 && service.experience < minExperience) return false;
        if (maxExperience > 0 && service.experience > maxExperience) return false;
        if (minCost > 0 && service.cost < minCost) return false;
        if (maxCost > 0 && service.cost > maxCost) return false;
      }

      return true;
    });
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
