import { Link } from 'react-router-dom';
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

const LinkButtonEl = styled(Link)`
  display: inline-block;
  padding: 0.7rem 1rem;
  border-radius: var(--radii);
  background-color: var(--colors-ui);
  color: var(--colors-text-button);
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: var(--colors-ui-hover);
  }

  &:active {
    background-color: var(--colors-ui-active);
  }

  &:disabled,
  &[aria-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const AltButtonEl = styled(LinkButtonEl)`
  background-color: var(--colors-edit-btn);
  color: var(--colors-text-main);

  &:hover {
    background-color: var(--colors-edit-btn-hover);
  }
`;

interface CardProps {
  children?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

interface LinkButtonProps {
  children?: string;
  to: string;
}

// Кнопка стандартная
export const Button = ({ children, onClick, type }: CardProps) => (
  <ButtonEl onClick={onClick} type={type}>
    {children}
  </ButtonEl>
);

// Кнопка на основе ссылки
export const LinkButton = ({ children, to }: LinkButtonProps) => (
  <LinkButtonEl to={to || '#'}>{children}</LinkButtonEl>
);

// Альтернативная кнопка на основе ссылки
export const AltLinkButton = ({ children, to }: LinkButtonProps) => (
  <AltButtonEl to={to || '#'}>{children}</AltButtonEl>
);
