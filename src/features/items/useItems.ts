import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';

import { clearDetails, selectDetails } from '../details/detailsSlice';
import {
  loadItems,
  selectPaginatedProducts,
  selectItemsState,
  selectFilteredItems,
} from './itemsSlice';
import { ItemWithDetails } from '../../types';
import { selectCategory, selectSearch } from '../controls/controlsSlice';
import { resetCurrentPage } from '../pagination/paginationSlice';

// Типизируем возвращаемые значения
type UseItemsResult = [ItemWithDetails[], string | null, string, ItemWithDetails[]];

// Хук загрузки списка объявлений
const useItems = (): UseItemsResult => {
  const dispatch = useAppDispatch();
  const { currentItem } = useAppSelector(selectDetails);
  const { error, status } = useAppSelector(selectItemsState);
  const search = useAppSelector(selectSearch);
  const category = useAppSelector(selectCategory);
  const items = useAppSelector(selectPaginatedProducts);
  const filteredItems = useAppSelector(selectFilteredItems);

  // Получение объявлений с сервера и очистка текущих данных
  useEffect(() => {
    dispatch(loadItems());
    if (currentItem) dispatch(clearDetails());
  }, [dispatch, currentItem]);

  // Сброс номера страницы для динамической пагинации
  useEffect(() => {
    dispatch(resetCurrentPage());
  }, [dispatch, search, category]);

  return [items, error, status, filteredItems];
};

export default useItems;
