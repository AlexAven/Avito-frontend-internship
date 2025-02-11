import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../components/Layout';
import ListPage from '../pages/ListPage';
import FormPage from '../pages/FormPage';
import ItemPage from '../pages/ItemPage';
import NotFoundPage from '../pages/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="list" element={<ListPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="item/:id" element={<ItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
