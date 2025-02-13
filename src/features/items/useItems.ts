import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';

import { ItemWithDetails } from '../../types';
import { clearDetails } from '../details/detailsSlice';
import { loadItems, selectFilteredItems } from './itemsSlice';

type UseItemsResult = [ItemWithDetails[]];

const useItems = (): UseItemsResult => {
  const dispatch = useAppDispatch();

  const items: ItemWithDetails[] = useAppSelector(selectFilteredItems);

  useEffect(() => {
    dispatch(loadItems());
    dispatch(clearDetails());
  }, [dispatch]);

  // return [items, status, error];
  return [items];
};

export default useItems;
