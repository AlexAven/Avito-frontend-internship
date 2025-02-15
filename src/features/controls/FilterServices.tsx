/* eslint-disable @typescript-eslint/no-explicit-any */
import useFilters from './useFilters';

import NumberInput from '../../components/NumberInput';
import { ItemTypes } from '../../types';
import { FiltersContainer, LabelCustom, SelectCustom } from './styles';

// Компонент фильтров категории "Услуги"
const FilterServices = () => {
  const { getOptions, selectedOption, filters, handleFilterChange, setSelectedOption } =
    useFilters();

  return (
    <>
      <FiltersContainer>
        <LabelCustom>
          Тип услуги:
          <SelectCustom
            options={getOptions('serviceType')}
            value={selectedOption}
            onChange={(option: any) => {
              setSelectedOption(option);
              handleFilterChange('serviceType', option.value);
            }}
            placeholder="Выберите фильтр"
          />
        </LabelCustom>

        <LabelCustom>
          Опыт от (лет):
          <NumberInput
            value={filters[ItemTypes.SERVICES].minExperience || ''}
            onChange={(e) => handleFilterChange('minExperience', +e.target.value)}
          />
        </LabelCustom>

        <LabelCustom>
          Опыт до (лет):
          <NumberInput
            value={filters[ItemTypes.SERVICES].maxExperience || ''}
            onChange={(e) => handleFilterChange('maxExperience', +e.target.value)}
          />
        </LabelCustom>

        <LabelCustom>
          Цена от (руб.):
          <NumberInput
            value={filters[ItemTypes.SERVICES].minCost || ''}
            onChange={(e) => handleFilterChange('minCost', +e.target.value)}
          />
        </LabelCustom>

        <LabelCustom>
          Цена до (руб.):
          <NumberInput
            value={filters[ItemTypes.SERVICES].maxCost || ''}
            onChange={(e) => handleFilterChange('maxCost', +e.target.value)}
          />
        </LabelCustom>
      </FiltersContainer>
    </>
  );
};

export default FilterServices;
