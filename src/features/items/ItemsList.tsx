import { useNavigate } from 'react-router-dom';

import { ItemWithDetails } from '../../types';
import { useAppSelector } from '../../app/store';
import { selectFilteredItems } from './itemsSlice';
import Pagination from '../pagination/Pagination';
import Card from '../../components/Card';
import List from '../../components/List';
import useItems from './useItems';

const ItemsList = () => {
  const navigate = useNavigate();

  const itemsQty = useAppSelector(selectFilteredItems).length;

  // const [items, status, error] = useItems();
  const [items] = useItems();

  return (
    <>
      {/* {error && <h2>Cannot fetch data</h2>}
      {status === 'loading' && <LoadBar />}
      {status === 'received' && ( */}
      <List>
        {items.map((item: ItemWithDetails) => (
          <Card key={item.id} onClick={() => navigate(`/item/${item.id}`)} item={item} />
        ))}
        <Pagination totalItems={itemsQty} />
      </List>
    </>
  );
};

export default ItemsList;
