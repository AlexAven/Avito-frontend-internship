import styled from 'styled-components';
import { ChildrenProps } from '../types';

import { Container } from './Container';

const Wrapper = styled.main`
  padding: 2rem, 0;

  @media (min-width: 767px) {
    padding: 4rem 0;
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
