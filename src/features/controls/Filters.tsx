/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '../../app/store';
import { selectCategory, selectFilters, setFilters } from '../controls/controlsSlice';
import { ItemTypes } from '../../types';
import styled from 'styled-components';

import Select from 'react-select';
import { useEffect, useState } from 'react';
import { selectCategorizedEntities } from '../items/itemsSlice';

const FiltersContainer = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// const SelectCustom = styled.select`
//   width: 100%;
//   padding: 1.2rem 2rem;
//   border-radius: var(--radii);
//   background-color: var(--colors-input);
//   font-weight: var(--fw-semi-bold);
//   cursor: pointer;

//   &:focus {
//     border: none;
//     outline: none;
//   }

//   &:hover {
//     background-color: var(--colors-input-hover);
//   }
// `;

const InputCustom = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  background-color: var(--colors-input);
  font-weight: var(--fw-semi-bold);
  border-radius: var(--radii);

  &::-webkit-search-cancel-button {
    display: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:hover {
    background-color: var(--colors-input-hover);
  }
`;

const LabelCustom = styled.label`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
  cursor: default;

  /* & > span {
    font-size: var(--fs-md);
    color: var(--colors-text-desc);
    font-weight: var(--fw-semi-bold);
  } */
`;

const Filters = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const filters = useAppSelector(selectFilters);
  const entities = useAppSelector(selectCategorizedEntities);

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

  const [selectedOption, setSelectedOption] = useState(null);

  const handleFilterChange = (field: string, value: string | number) => {
    dispatch(setFilters({ category, filters: { [field]: value } }));
  };

  useEffect(() => {
    setSelectedOption(null);
  }, [category]);

  if (category === ItemTypes.REAL_ESTATE) {
    return (
      <FiltersContainer>
        <LabelCustom>
          Тип недвижимости:
          <Select
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
          Мин. площадь:
          <InputCustom
            type="number"
            value={filters[ItemTypes.REAL_ESTATE].minArea || ''}
            onChange={(e) => handleFilterChange('minArea', +e.target.value)}
          />
        </LabelCustom>
        <LabelCustom>
          Макс. площадь:
          <InputCustom
            type="number"
            value={filters[ItemTypes.REAL_ESTATE].maxArea || ''}
            onChange={(e) => handleFilterChange('maxArea', +e.target.value)}
          />
        </LabelCustom>
        <LabelCustom>
          Макс. комнат:
          <InputCustom
            type="number"
            value={filters[ItemTypes.REAL_ESTATE].rooms || ''}
            onChange={(e) => handleFilterChange('rooms', +e.target.value)}
          />
        </LabelCustom>
        <LabelCustom>
          Цена от (руб.):
          <InputCustom
            type="number"
            value={filters[ItemTypes.REAL_ESTATE].minPrice || ''}
            onChange={(e) => handleFilterChange('minPrice', +e.target.value)}
          />
        </LabelCustom>
        <LabelCustom>
          Цена до (руб.):
          <InputCustom
            type="number"
            value={filters[ItemTypes.REAL_ESTATE].maxPrice || ''}
            onChange={(e) => handleFilterChange('maxPrice', +e.target.value)}
          />
        </LabelCustom>
      </FiltersContainer>
    );
  }

  if (category === ItemTypes.AUTO) {
    return (
      <FiltersContainer>
        <LabelCustom>
          Марка:
          <Select
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
            value={filters[ItemTypes.AUTO].model}
            onChange={(e) => handleFilterChange('model', e.target.value)}
            placeholder="Введите название"
          />
        </LabelCustom>
        <LabelCustom>
          Не старее (год):
          <InputCustom
            type="number"
            value={filters[ItemTypes.AUTO].minYear}
            onChange={(e) => handleFilterChange('minYear', e.target.value)}
          />
        </LabelCustom>
        <LabelCustom>
          Не новее (год):
          <InputCustom
            type="number"
            value={filters[ItemTypes.AUTO].maxYear}
            onChange={(e) => handleFilterChange('maxYear', e.target.value)}
          />
        </LabelCustom>
        <LabelCustom>
          Пробег от (км):
          <InputCustom
            type="number"
            value={filters[ItemTypes.AUTO].minMileage}
            onChange={(e) => handleFilterChange('minMileage', e.target.value)}
          />
        </LabelCustom>
        <LabelCustom>
          Пробег до (км):
          <InputCustom
            type="number"
            value={filters[ItemTypes.AUTO].maxMileage}
            onChange={(e) => handleFilterChange('maxMileage', e.target.value)}
          />
        </LabelCustom>
      </FiltersContainer>
    );
  }

  if (category === ItemTypes.SERVICES) {
    return (
      <FiltersContainer>
        <LabelCustom>
          Тип услуги:
          <Select
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
          <InputCustom
            type="number"
            value={filters[ItemTypes.SERVICES].minExperience}
            onChange={(e) => handleFilterChange('minExperience', e.target.value)}
          />
        </LabelCustom>
        <LabelCustom>
          Опыт до (лет):
          <InputCustom
            type="number"
            value={filters[ItemTypes.SERVICES].maxExperience}
            onChange={(e) => handleFilterChange('maxExperience', e.target.value)}
          />
        </LabelCustom>
        <LabelCustom>
          Цена от (руб.):
          <InputCustom
            type="number"
            value={filters[ItemTypes.SERVICES].minCost}
            onChange={(e) => handleFilterChange('minCost', e.target.value)}
          />
        </LabelCustom>
        <LabelCustom>
          Цена до (руб.):
          <InputCustom
            type="number"
            value={filters[ItemTypes.SERVICES].maxCost}
            onChange={(e) => handleFilterChange('maxCost', e.target.value)}
          />
        </LabelCustom>
      </FiltersContainer>
    );
  }

  return null;
};

export default Filters;
