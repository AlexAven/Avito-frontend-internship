import styled from 'styled-components';

import { Container } from '../components/Container';
import { LinkButton } from '../components/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > :last-child {
    width: 15%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Страница для перехода на несуществующий адрес
const NotFoundPage = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Ой, такой страницы не существует...</Title>
        <LinkButton to={'/list'}>На главную</LinkButton>
      </Wrapper>
    </Container>
  );
};

export default NotFoundPage;
