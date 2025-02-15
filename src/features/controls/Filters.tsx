import useFilters from './useFilters';

import { ItemTypes, ItemType } from '../../types';
import FilterAuto from './FilterAuto';
import FilterRealEstate from './FilterRealEstate';
import FilterServices from './FilterServices';

// Компонент рендера фильтров в зависимости от выбранной категории;
const Filters = () => {
  const { category } = useFilters();

  const categoryToComponentMap: Record<ItemType, React.ComponentType | null> = {
    [ItemTypes.REAL_ESTATE]: FilterRealEstate,
    [ItemTypes.AUTO]: FilterAuto,
    [ItemTypes.SERVICES]: FilterServices,
    Все: null,
  };

  // Рендер фильтров или null, в зависимости от полученного "category"
  const SelectedFilter = categoryToComponentMap[category];

  return SelectedFilter && <SelectedFilter />;
};

export default Filters;
