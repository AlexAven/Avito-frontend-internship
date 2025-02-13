import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch } from '../app/store';
import { clearDetails } from '../features/details/detailsSlice';
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
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateNewItem = () => {
    dispatch(clearDetails());
    navigate('/form');
  };

  const showButton =
    location.pathname === '/' ||
    location.pathname === '/list' ||
    location.pathname.startsWith('/item/');

  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          {showButton && <Button onClick={handleCreateNewItem}>Новое объявление</Button>}
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};

export default Header;
