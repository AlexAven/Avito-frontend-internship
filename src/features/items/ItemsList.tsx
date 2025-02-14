import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useItems from './useItems';

import { ItemWithDetails } from '../../types';
import { useAppSelector } from '../../app/store';
import { selectFilteredItems } from './itemsSlice';
import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import Pagination from '../pagination/Pagination';
import Card from '../../components/Card';
import List from '../../components/List';

const Title = styled.h1`
  font-size: var(--fs-lg);
  font-weight: var(--fw-bold);
  text-align: center;
  padding: 2.5rem 0 2rem;
`;

const NoItems = styled.h3`
  padding: 4rem 0;
  font-size: var(--fs-md-xlg);
  color: var(--colors-text-desc);
  text-align: center;
`;

// Компонент страницы списка объявлений
const ItemsList = () => {
  const navigate = useNavigate();
  const itemsQty = useAppSelector(selectFilteredItems).length;
  const [items, error, status] = useItems();

  return (
    <>
      <Title>Список объявлений</Title>
      {error && <Error>{error}</Error>}
      {status === 'loading' && <Loading />}
      {status === 'received' && (
        <List>
          {items.length ? (
            items.map((item: ItemWithDetails) => (
              <Card key={item.id} onClick={() => navigate(`/item/${item.id}`)} item={item} />
            ))
          ) : (
            <NoItems>Здесь пока что нет объявлений...</NoItems>
          )}
          <Pagination totalItems={itemsQty} />
        </List>
      )}
    </>
  );
};

export default ItemsList;
