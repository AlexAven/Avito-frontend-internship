import { useNavigate } from 'react-router-dom';

import List from '../../components/List';
import Card from '../../components/Card';
import useItems from './useItems';
import { ItemWithDetails } from '../../types';
// import LoadBar from '../../components/LoadBar';
// import useCountries from './useCountries';

const ItemsList = () => {
  const navigate = useNavigate();

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
      </List>
    </>
  );
};

export default ItemsList;
