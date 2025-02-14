import styled, { keyframes } from 'styled-components';
import { Form, Field } from 'formik';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > :first-child {
    width: 25%;
  }

  & > :last-child {
    width: 25%;
  }
`;

export const ErrorText = styled.div`
  color: var(--error);
  font-size: var(--fs-md);
  margin-top: 0.5rem;
  animation: ${slideDown} 1s ease forwards;
  position: absolute;
  bottom: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
  max-width: 1350px;
  padding: 0 2rem;
  padding: 3rem 0;
`;

export const FormCustom = styled(Form)`
  width: 100%;
  max-width: 80rem;
  display: flex;
  flex-direction: column;

  /* & > :last-child {
    margin-left: auto;
    width: 30%;
    height: 4rem;
  } */
`;

export const Title = styled.h1`
  font-size: var(--fs-lg);
  font-weight: var(--fw-bold);
`;

export const InputCustom = styled(Field).attrs({
  autoComplete: 'off',
  maxLength: '95',
})`
  width: 100%;
  padding: 1.5rem 2rem;
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

export const TextAreaCustom = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 1rem;
  border-radius: var(--radii);
  resize: none;
  background-color: var(--colors-input);
  font-weight: var(--fw-semi-bold);

  &:focus {
    border: 2px solid var(--colors-ui);
    outline: none;
  }

  &:hover {
    background-color: var(--colors-input-hover);
  }
`;

export const SelectCustom = styled.select`
  width: 100%;
  padding: 1.2rem 2rem;
  border-radius: var(--radii);
  background-color: var(--colors-input);
  font-weight: var(--fw-semi-bold);
  cursor: pointer;

  &:focus {
    border: none;
    outline: none;
  }

  &:hover {
    background-color: var(--colors-input-hover);
  }
`;

export const LabelCustom = styled.label`
  font-size: var(--fs-md-lg);
  font-weight: var(--fw-bold);
  padding: 1rem;
  cursor: default;

  & > span {
    font-size: var(--fs-md);
    color: var(--colors-text-desc);
    font-weight: var(--fw-semi-bold);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 3rem;
  position: relative;
`;
