import { selectSearch, setSearch } from './controlsSlice';
import { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/store';

const useSearch = (): [string, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    if (search || event.target.value.trim()) {
      dispatch(setSearch(event.target.value));
    }
  };

  return [search, handleSearch];
};

export default useSearch;
