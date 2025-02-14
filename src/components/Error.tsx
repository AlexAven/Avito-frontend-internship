import styled from 'styled-components';

import { ChildrenProps } from '../types';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 5rem;
`;

const TextError = styled.h2`
  text-align: center;
  font-size: var(--fs-md-xlg);
  font-weight: var(--fw-semi-bold);
  color: var(--colors-text-desc);

  @media (max-width: 500px) {
    font-size: var(--fs-md);
  }
`;

export const Error = ({ children }: ChildrenProps) => {
  return (
    <Wrapper>
      <TextError>{children}</TextError>
    </Wrapper>
  );
};
