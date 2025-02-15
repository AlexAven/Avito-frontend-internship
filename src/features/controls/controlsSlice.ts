/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

import { ControlsState, Store, ItemTypes, FiltersState } from '../../types';

// Cтейт управления объявлениями (поиск, категории, фильтры)
const initialState: ControlsState = {
  search: '',
  category: 'Все',
  filters: {
    [ItemTypes.REAL_ESTATE]: {
      propertyType: '',
      minArea: 0,
      maxArea: 0,
      rooms: 0,
      minPrice: 0,
      maxPrice: 0,
    },
    [ItemTypes.AUTO]: {
      brand: '',
      model: '',
      minYear: 0,
      maxYear: 0,
      minMileage: 0,
      maxMileage: 0,
    },
    [ItemTypes.SERVICES]: {
      serviceType: '',
      minExperience: 0,
      maxExperience: 0,
      minCost: 0,
      maxCost: 0,
    },
  },
};

const controlsSlice = createSlice({
  name: '@@controls',
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setCategory: (state, { payload }) => {
      state.category = payload;
    },
    setFilters: (state, { payload }: { payload: { category: any; filters: any } }) => {
      const { category, filters } = payload;
      state.filters[category as keyof FiltersState] = {
        ...state.filters[category as keyof FiltersState],
        ...filters,
      };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setSearch, setCategory, setFilters, clearFilters } = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;

// Селекторы
// Селектор получения фильтров по всем категориям
export const selectFilters = (state: Store) => state.controls.filters;

// Селектор получения текущего значания поисковой строки
export const selectSearch = (state: Store) => state.controls.search;

// Селектор получения всех категорий объявлений
export const selectCategory = (state: Store) => state.controls.category;
