import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import * as api from '../api/api';

import { itemsReducer } from '../features/items/itemsSlice';
import { controlsReducer } from '../features/controls/controlsSlice';
import { detailsReducer } from '../features/details/detailsSlice';
import { paginationReducer } from '../features/pagination/paginationSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    controls: controlsReducer,
    details: detailsReducer,
    pagination: paginationReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});

export default store;

// Типы для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Создание типизированных хуков
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
