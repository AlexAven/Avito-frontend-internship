import { createSlice } from '@reduxjs/toolkit';

import { PaginationState } from '../../types';

// Начальное состояние стейта пагинации
const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 5,
};

const paginationSlice = createSlice({
  name: '@@pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    resetCurrentPage: (state) => {
      state.currentPage = 1; // Сбрасываем на первую страницу
    },
  },
});

export const { setCurrentPage, resetCurrentPage } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
