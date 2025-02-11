// import Controls from '../features/controls/Controls';
// import CountryList from '../features/countries/CountryList';

// import { useEffect } from 'react';
// import { useAppDispatch } from '../app/store';

// import { loadItems } from '../features/items/itemsSlice';
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
