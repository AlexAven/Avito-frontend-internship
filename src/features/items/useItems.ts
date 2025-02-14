import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';

import { clearDetails, selectDetails } from '../details/detailsSlice';
import { loadItems, selectPaginatedProducts, selectItemsState } from './itemsSlice';
import { ItemWithDetails } from '../../types';

// Типизируем возвращаемые значения
type UseItemsResult = [ItemWithDetails[], string | null, string];

// Хук загрузки списка объявлений
const useItems = (): UseItemsResult => {
  const { currentItem } = useAppSelector(selectDetails);
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector(selectItemsState);
  const items = useAppSelector(selectPaginatedProducts);

  useEffect(() => {
    // Загрузка списка объявлений
    dispatch(loadItems());
    // Очистка данных о выбранном объявлении
    if (currentItem) dispatch(clearDetails());
  }, [dispatch, currentItem]);

  return [items, error, status];
};

export default useItems;
