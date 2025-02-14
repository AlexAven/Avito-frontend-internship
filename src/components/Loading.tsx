import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoading = styled.div`
  margin: 0 auto;
  padding: 5rem;
  width: 7rem;
  height: 7rem;
  border: 2rem solid rgba(229, 223, 223, 0.731);
  border-top: 2rem solid #bbb9b9a0;
  border-radius: 50%;
  animation: ${spin} 1.2s linear infinite;

  @media (max-width: 500px) {
    padding: 2rem;
    width: 4rem;
    height: 4rem;
  }
`;

export const Loading: React.FC = () => <StyledLoading />;
