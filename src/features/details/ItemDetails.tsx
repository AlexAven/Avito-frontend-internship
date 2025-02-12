import useDetails from './useDetails';
import Info from './Info';

interface ItemsDetailsProps {
  id: number;
}

const ItemsDetails: React.FC<ItemsDetailsProps> = ({ id }) => {
  const { currentItem, error, status } = useDetails(id);

  return (
    <>
      {/* {status === 'loading' && <LoadBar />} */}
      {error && <h2>{error}</h2>}
      {currentItem && <Info item={currentItem} />}
    </>
  );
};

export default ItemsDetails;
