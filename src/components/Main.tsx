import styled from 'styled-components';

import { ChildrenProps } from '../types';
import { Container } from './Container';

const Wrapper = styled.main`
  padding: 2rem, 0;
  height: 90vh;

  @media (min-width: 767px) {
    padding: 2rem 0 4rem;
  }
`;

const Main = ({ children }: ChildrenProps) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Main;
