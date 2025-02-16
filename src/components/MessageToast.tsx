/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch, useAppSelector } from '../app/store';
import { clearUi, selectItemsState } from '../features/items/itemsSlice';

// Компонент всплывающего уведомления
const MessageToast = () => {
  const dispatch = useAppDispatch();
  const { ui } = useAppSelector(selectItemsState);

  useEffect(() => {
    if (ui.status === 'rejected') {
      toast.error(ui.error, {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'top-right',
      });
      dispatch(clearUi());
    }
    if (ui.status === 'received') {
      toast.success(ui.message, {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'top-right',
      });
      dispatch(clearUi());
    }
  }, [ui.status, dispatch]);
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default MessageToast;
