import { createSlice } from '@reduxjs/toolkit';

import { ControlsState, Store } from '../../types';

const initialState: ControlsState = {
  search: '',
  category: 'Все',
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
    clearControls: () => initialState,
  },
});

export const { setSearch, setCategory, clearControls } = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;

// Селекторы фильтров
export const selectSearch = (state: Store) => state.controls.search;
export const selectCategory = (state: Store) => state.controls.category;
