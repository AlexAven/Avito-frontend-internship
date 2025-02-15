/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { selectCategory, selectFilters, setFilters } from '../controls/controlsSlice';
import { selectCategorizedEntities } from '../items/itemsSlice';

// Кастомный хук фильтров
const useFilters = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const filters = useAppSelector(selectFilters);
  const entities = useAppSelector(selectCategorizedEntities);

  // Хелпер получающий список (типа жилья, марки авто, вида услуги) из существующих объявлений
  const getOptions = (filter: any) => {
    const uniqueValues = Array.from(
      new Set(Object.values(entities).map((item: any) => item[filter])),
    );

    return [
      { value: '', label: 'Все' },
      ...uniqueValues.map((targetFilter) => ({
        value: targetFilter,
        label: targetFilter,
      })),
    ];
  };

  // Стейт для текущего значения выпадющего меню (селекта)
  const [selectedOption, setSelectedOption] = useState(null);

  // Обработчик события выбора значения в селекте
  const handleFilterChange = (field: string, value: string | number) => {
    dispatch(setFilters({ category, filters: { [field]: value } }));
  };

  // Сброс выбранного значения селекта при переключении категории
  useEffect(() => {
    setSelectedOption(null);
  }, [category]);

  return { filters, getOptions, selectedOption, category, handleFilterChange, setSelectedOption };
};

export default useFilters;
