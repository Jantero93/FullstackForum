import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/** Toast hook & type */
import { useToast, ToastType } from '../../contexts/ToastContext';

const toastStyle = { border: '1px solid white' };

const Toast: React.FC = (): JSX.Element => {
  const toastAttributes: ToastType = useToast();

  useEffect(() => {
    const toastInfo = () =>
      toast.success(toastAttributes.message, {
        style: toastStyle
      });
    const toastError = () =>
      toast.error(toastAttributes.message, {
        style: toastStyle
      });

    const showNotification = () => {
      toastAttributes.error ? toastError() : toastInfo();
    };
    toastAttributes.message && showNotification();
  }, [toastAttributes]);

  return (
    <ToastContainer
      autoClose={3000}
      closeOnClick
      draggable={false}
      hideProgressBar
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position={'bottom-center'}
      rtl={false}
      theme={'dark'}
    />
  );
};

export default Toast;
