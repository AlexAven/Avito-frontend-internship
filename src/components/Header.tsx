import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { clearDetails, selectDetails } from '../features/details/detailsSlice';
import { useAppDispatch, useAppSelector } from '../app/store';
import { Container } from './Container';
import { Button } from './Button';
import { clearControls } from '../features/controls/controlsSlice';
import { loadItems } from '../features/items/itemsSlice';

const HeaderEl = styled.header`
  height: 4.3rem;
  background-color: var(--colors-bg-alt);
  color: var(--colors-text-alt);
  margin-bottom: 3rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 0;
`;

const Logo = styled.img.attrs({
  src: './src/assets/images/logo.png',
})`
  display: inline-block;
  height: 50px;
  object-fit: contain;
  object-position: left;
  padding-left: 4rem;

  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentItem } = useAppSelector(selectDetails);

  // Обработчик клика для сброса информации о текущем объявлении и создании нового
  const handleCreateNewItem = () => {
    if (currentItem) dispatch(clearDetails());
    navigate('/form');
  };

  // Обработчик клика по лого и сброса всех фильтров
  const handleLogoClick = () => {
    dispatch(clearControls());
    navigate('/list');
  };

  // Определяем наше положение на сайте для скрытия/показа кнопки в шапке
  const showButton =
    location.pathname === '/' ||
    location.pathname === '/list' ||
    location.pathname.startsWith('/item/');

  return (
    <>
      <HeaderEl>
        <Container>
          <Wrapper>
            {showButton && <Button onClick={handleCreateNewItem}>Новое объявление</Button>}
          </Wrapper>
        </Container>
      </HeaderEl>
      <Container>
        <Logo onClick={handleLogoClick} />
      </Container>
    </>
  );
};

export default Header;
