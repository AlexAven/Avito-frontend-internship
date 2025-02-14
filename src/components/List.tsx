import styled from 'styled-components';

import { ChildrenProps } from '../types';

const Wrapper = styled.section`
  max-width: 70rem;
  margin: 0 auto;
  padding: 2rem 0;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  & > :last-child {
    justify-self: center;
  }

  /* @media (min-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;

    padding: 2.5rem 0;
  } */

  @media (min-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 4rem;
  }
`;

const List = ({ children }: ChildrenProps) => <Wrapper>{children}</Wrapper>;

export default List;
