import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { loadItemById, selectDetails } from './detailsSlice';

const useDetails = (id: number) => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectDetails);

  // Загрузка выбранного объявления по ID
  useEffect(() => {
    dispatch(loadItemById(id));
  }, [id, dispatch]);

  return details;
};

export default useDetails;
