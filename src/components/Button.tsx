import styled from 'styled-components';

const ButtonEl = styled.button`
  padding: 0.7rem 1rem;
  border-radius: var(--radii);
  background-color: var(--colors-ui);
  color: var(--colors-text-button);

  &:hover {
    background-color: var(--colors-ui-hover);
  }

  &:active {
    background-color: var(--colors-ui-active);
  }
`;

const AltButtonEl = styled.button`
  padding: 0.7rem 1rem;
  border-radius: var(--radii);
  background-color: var(--colors-edit-btn);

  &:hover {
    background-color: var(--colors-edit-btn-hover);
  }
`;

interface CardProps {
  children?: string;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: CardProps) => (
  <ButtonEl onClick={onClick}>{children}</ButtonEl>
);

export const EditButton = ({ children, onClick }: CardProps) => (
  <AltButtonEl onClick={onClick}>{children}</AltButtonEl>
);
