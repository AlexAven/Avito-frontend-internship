/* eslint-disable @typescript-eslint/no-explicit-any */
import useFilters from './useFilters';

import { ItemTypes } from '../../types';
import { FiltersContainer, LabelCustom, SelectCustom } from './styles';
import NumberInput from '../../components/NumberInput';

// Компонент фильтров категории "Недвижимость"
const FilterRealEstate = () => {
  const { getOptions, selectedOption, filters, handleFilterChange, setSelectedOption } =
    useFilters();

  return (
    <>
      <FiltersContainer>
        <LabelCustom>
          Тип недвижимости:
          <SelectCustom
            options={getOptions('propertyType')}
            value={selectedOption}
            onChange={(option: any) => {
              setSelectedOption(option);
              handleFilterChange('propertyType', option.value);
            }}
            placeholder="Выберите фильтр"
          />
        </LabelCustom>

        <LabelCustom>
          Мин. площадь (м²):
          <NumberInput
            value={filters[ItemTypes.REAL_ESTATE].minArea || ''}
            onChange={(e) => handleFilterChange('minArea', +e.target.value)}
          />
        </LabelCustom>

        <LabelCustom>
          Макс. площадь (м²):
          <NumberInput
            value={filters[ItemTypes.REAL_ESTATE].maxArea || ''}
            onChange={(e) => handleFilterChange('maxArea', +e.target.value)}
          />
        </LabelCustom>

        <LabelCustom>
          Количество комнат:
          <NumberInput
            value={filters[ItemTypes.REAL_ESTATE].rooms || ''}
            onChange={(e) => handleFilterChange('rooms', +e.target.value)}
          />
        </LabelCustom>

        <LabelCustom>
          Цена от (руб.):
          <NumberInput
            value={filters[ItemTypes.REAL_ESTATE].minPrice || ''}
            onChange={(e) => handleFilterChange('minPrice', +e.target.value)}
          />
        </LabelCustom>

        <LabelCustom>
          Цена до (руб.):
          <NumberInput
            value={filters[ItemTypes.REAL_ESTATE].maxPrice || ''}
            onChange={(e) => handleFilterChange('maxPrice', +e.target.value)}
          />
        </LabelCustom>
      </FiltersContainer>
    </>
  );
};

export default FilterRealEstate;
