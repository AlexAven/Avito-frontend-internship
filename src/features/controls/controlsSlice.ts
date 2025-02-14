import { createSlice } from '@reduxjs/toolkit';

import { ControlsState, Store, ItemTypes } from '../../types';

// // Начальное состояние стейта фильтров
// const initialState: ControlsState = {
//   search: '',
//   category: 'Все',
// };

// const controlsSlice = createSlice({
//   name: '@@controls',
//   initialState,
//   reducers: {
//     setSearch: (state, { payload }) => {
//       state.search = payload;
//     },
//     setCategory: (state, { payload }) => {
//       state.category = payload;
//     },
//     clearControls: () => initialState,
//   },
// });

// export const { setSearch, setCategory, clearControls } = controlsSlice.actions;
// export const controlsReducer = controlsSlice.reducer;

// // Селекторы фильтров
// export const selectSearch = (state: Store) => state.controls.search;
// export const selectCategory = (state: Store) => state.controls.category;

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
    setFilters: (state, { payload }) => {
      const { category, filters } = payload;
      state.filters[category] = {
        ...state.filters[category],
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

// Селекторы для получения фильтров
export const selectFilters = (state: Store) => state.controls.filters;

// // Селекторы фильтров
export const selectSearch = (state: Store) => state.controls.search;
export const selectCategory = (state: Store) => state.controls.category;
