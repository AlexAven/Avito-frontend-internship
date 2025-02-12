import { useParams } from 'react-router-dom';

import ItemsDetails from '../features/details/ItemDetails';

const DetailsPage = () => {
  const { id } = useParams();

  return (
    <>
      <ItemsDetails id={Number(id)} />
    </>
  );
};

export default DetailsPage;
