import styled from 'styled-components';

import useSearch from './useSearch';

const InputContainer = styled.label`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1rem 0;
`;

const Input = styled.input.attrs({
  type: 'search',
  placeholder: 'Поиск по объявлениям',
})`
  width: 100%;
  max-width: 700px;
  padding: 0.8rem 1rem;
  border: 0.2rem solid var(--colors-ui);
  border-radius: var(--radii);

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

const Search = () => {
  const [search, handleSearch] = useSearch();

  return (
    <InputContainer>
      <Input onChange={handleSearch} value={search} />
    </InputContainer>
  );
};

export default Search;
