import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { selectPagination } from '../items/itemsSlice';
import { setCurrentPage } from './paginationSlice';

interface PaginationProps {
  totalItems: number;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem;
`;

const PageButton = styled.button`
  width: 4rem;
  height: 3.5rem;
  border-radius: var(--radii);
  background-color: var(--color-page-btn);

  &:hover {
    background-color: var(--color-page-btn-hover);
  }

  &.active {
    background-color: var(--color-page-btn-checked);

    &:hover {
      background-color: var(--color-page-btn-checked-hover);
    }
  }
`;

const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const dispatch = useAppDispatch();
  const { currentPage, itemsPerPage } = useAppSelector(selectPagination);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <PaginationContainer>
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;

        return (
          <PageButton
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </PageButton>
        );
      })}
    </PaginationContainer>
  );
};

export default Pagination;
