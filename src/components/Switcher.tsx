import styled from 'styled-components';

const RadioLabel = styled.label<{ $ischecked: boolean }>`
  padding: 1.1rem 2rem;
  border-radius: var(--radii);
  cursor: pointer;
  background-color: ${({ $ischecked }) =>
    $ischecked ? 'var(--colors-filter-btn-checked)' : 'var(--colors-filter-unchecked-btn)'};
  &:hover {
    background-color: ${({ $ischecked }) =>
      $ischecked
        ? 'var(--colors-filter-btn-checked-hover)'
        : 'var(--colors-filter-btn-unchecked-hover)'};
  }
`;

const RadioEl = styled.input.attrs({ type: 'radio', name: 'category' })`
  display: none;
`;

const RadioTitle = styled.span<{ $ischecked: boolean }>`
  color: ${({ $ischecked }) => ($ischecked ? 'var(--colors-text-alt)' : 'var(--colors-text-main)')};
  font-weight: var(--fw-semi-bold);
  white-space: nowrap;
`;

interface Switcher {
  title: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const Switcher = ({ title, onChange, value, checked, name }: Switcher) => {
  return (
    <RadioLabel $ischecked={checked}>
      <RadioEl value={value} onChange={onChange} checked={checked} name={name} />
      <RadioTitle $ischecked={checked}>{title}</RadioTitle>
    </RadioLabel>
  );
};

export default Switcher;
