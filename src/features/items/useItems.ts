import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';

import { ItemWithDetails } from '../../types';
import { clearDetails } from '../details/detailsSlice';
import { loadItems, selectPaginatedProducts } from './itemsSlice';

type UseItemsResult = [ItemWithDetails[]];

const useItems = (): UseItemsResult => {
  const dispatch = useAppDispatch();

  const items: ItemWithDetails[] = useAppSelector(selectPaginatedProducts);

  useEffect(() => {
    // Загрузка объявлений
    dispatch(loadItems());
    // Очистка стейта о выбранном объявлении
    dispatch(clearDetails());
  }, [dispatch]);

  // return [items, status, error];
  return [items];
};

export default useItems;
