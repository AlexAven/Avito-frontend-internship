import useDetails from './useDetails';

import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';
import Info from './Info';

interface ItemsDetailsProps {
  id: number;
}

const ItemsDetails: React.FC<ItemsDetailsProps> = ({ id }) => {
  const { currentItem, error, status } = useDetails(id);

  return (
    <>
      {status === 'loading' && <Loading />}
      {error && <Error>{error}</Error>}
      {currentItem && <Info item={currentItem} />}
    </>
  );
};

export default ItemsDetails;
