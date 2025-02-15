import { selectSearch, setSearch } from './controlsSlice';
import { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/store';

// Кастомный хук строки поиска
const useSearch = (): [string, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);

  // Обработчик строки поиска
  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearch(event.target.value));
  };

  return [search, handleSearch];
};

export default useSearch;
