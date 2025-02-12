import ItemsList from '../features/items/ItemsList';
import Search from '../features/controls/Search';
import Category from '../features/controls/Category';

const ListPage = () => {
  return (
    <>
      <Search />
      <Category />
      <ItemsList />
    </>
  );
};

export default ListPage;
