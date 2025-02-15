import { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';

// Типы пропсов для компонента
interface CustomInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

const StyledInput = styled.input`
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

// Компонент числового инпута
const NumberInput: React.FC<CustomInputProps> = ({ onChange, value, ...rest }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const invalidKeys = ['e', 'E', '+', '-', '.', ',', 'ArrowUp', 'ArrowDown'];
    if (invalidKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^-|\D/.test(inputValue)) {
      return;
    }

    onChange(e);
  };

  return (
    <StyledInput
      type="number"
      value={value}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default NumberInput;
