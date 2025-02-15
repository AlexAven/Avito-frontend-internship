/* eslint-disable @typescript-eslint/no-explicit-any */
import NumberInput from '../../components/NumberInput';
import { ItemTypes } from '../../types';
import { FiltersContainer, LabelCustom, SelectCustom, InputCustom } from './styles';
import useFilters from './useFilters';

// Компонент фильтров категории "Авто"
const FilterAuto = () => {
  const { getOptions, selectedOption, filters, handleFilterChange, setSelectedOption } =
    useFilters();

  return (
    <>
      <FiltersContainer>
        <LabelCustom>
          Марка:
          <SelectCustom
            options={getOptions('brand')}
            value={selectedOption}
            onChange={(option: any) => {
              setSelectedOption(option);
              handleFilterChange('brand', option.value);
            }}
            placeholder="Выберите фильтр"
          />
        </LabelCustom>

        <LabelCustom>
          Модель:
          <InputCustom
            type="input"
            value={filters[ItemTypes.AUTO].model || ''}
            onChange={(e) => handleFilterChange('model', e.target.value)}
            placeholder="Введите название"
          />
        </LabelCustom>

        <LabelCustom>
          Не старее (год):
          <NumberInput
            value={filters[ItemTypes.AUTO].minYear || ''}
            onChange={(e) => handleFilterChange('minYear', +e.target.value)}
          />
        </LabelCustom>

        <LabelCustom>
          Не новее (год):
          <NumberInput
            value={filters[ItemTypes.AUTO].maxYear || ''}
            onChange={(e) => handleFilterChange('maxYear', +e.target.value)}
          />
        </LabelCustom>

        <LabelCustom>
          Пробег от (км):
          <NumberInput
            value={filters[ItemTypes.AUTO].minMileage || ''}
            onChange={(e) => handleFilterChange('minMileage', +e.target.value)}
          />
        </LabelCustom>

        <LabelCustom>
          Пробег до (км):
          <NumberInput
            value={filters[ItemTypes.AUTO].maxMileage || ''}
            onChange={(e) => handleFilterChange('maxMileage', +e.target.value)}
          />
        </LabelCustom>
      </FiltersContainer>
    </>
  );
};

export default FilterAuto;
