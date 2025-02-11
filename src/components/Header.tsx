import styled from 'styled-components';

import { Container } from './Container';
import { Button } from './Button';

const HeaderEl = styled.header`
  height: 4.3rem;
  background-color: var(--colors-bg-alt);
  color: var(--colors-text-alt);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 0;
`;

const Header = () => {
  const showButton =
    location.pathname === '/' ||
    location.pathname === '/list' ||
    location.pathname.startsWith('/item/');

  return (
    <HeaderEl>
      <Container>
        <Wrapper>{showButton && <Button>Разместить объявление</Button>}</Wrapper>
      </Container>
    </HeaderEl>
  );
};

export default Header;
