import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Layout from '../components/Layout';
import ListPage from '../pages/ListPage';
import FormPage from '../pages/FormPage';
import DetailsPage from '../pages/DetailsPage';
import NotFoundPage from '../pages/NotFoundPage';
import MessageToast from '../components/MessageToast';

function App() {
  const location = useLocation();

  return (
    <>
      <MessageToast />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="list" element={<ListPage key={location.key} />} />
          <Route path="form" element={<FormPage />} />
          <Route path="item/:id" element={<DetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
