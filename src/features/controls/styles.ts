import styled from 'styled-components';
import Select from 'react-select';

// Общие стили для компонентов фильтра
export const FiltersContainer = styled.div`
  padding: 2rem 0;
  @media (min-width: 450px) {
  }

  @media (min-width: 960px) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-start;

    & ~ {
      flex-shrink: 1;
    }
  }

  @media (min-width: 1220px) {
    padding: 3rem 0;
    flex-direction: column;
    gap: 2rem;

    & ~ {
      flex-shrink: 0;
    }
  }
`;

export const LabelCustom = styled.label`
  text-align: center;

  @media (min-width: 1220px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: var(--fs-md);
    font-weight: var(--fw-bold);
    cursor: default;
    text-align: left;
  }
`;

export const InputCustom = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  background-color: var(--colors-input);
  font-weight: var(--fw-semi-bold);
  border-radius: var(--radii);
  appearance: textfield;

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

export const SelectCustom = styled(Select).attrs({
  styles: {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'var(--colors-input)',
      color: 'var(--colors-text)',
      borderRadius: 'var(--radii)',
      padding: '0.25rem',
      height: '43px',
      border: 'none',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'var(--colors-input-hover)',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      color: 'var(--colors-text)',
      backgroundColor: state.isSelected ? 'var(--colors-input-checked)' : 'var(--colors-input)',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: !state.isSelected ? 'var(--colors-input-hover)' : '',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--colors-input)',
      borderRadius: 'var(--radii)',
    }),
  },
})`
  width: 100%;
  border-radius: var(--radii);
  border: none;

  & input {
    padding-left: 0.25rem;
  }

  & * {
    color: var(--colors-text-main) !important;
    font-weight: var(--fw-semi-bold) !important;
  }
`;
