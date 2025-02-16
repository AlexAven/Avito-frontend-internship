import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch, useAppSelector } from '../app/store';
import { clearError, selectItemsState } from '../features/items/itemsSlice';

// Компонент всплывающего сообщения об ошибке
const ErrorToast = () => {
  const dispatch = useAppDispatch();
  const { ui } = useAppSelector(selectItemsState);

  const { errorUi: error } = ui;

  useEffect(() => {
    if (error) {
      toast.error(error, {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'top-right',
      });

      dispatch(clearError());
    }
  }, [error, dispatch]);
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default ErrorToast;
