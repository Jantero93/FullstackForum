/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from 'react';

export type ToastType = {
  message: string;
  error?: boolean;
};

/** Default values */
const ToastContext = React.createContext({ message: '' });
const ToggleToastContext = createContext((toastAttributes: ToastType) => {});

/** Custom hooks */
export const useToast = (): ToastType => useContext(ToastContext);
export const useToastUpdate = (): ((toastAttributes: ToastType) => void) =>
  useContext(ToggleToastContext);

interface Props {
  children: React.ReactNode;
}

const ToastProvider: React.FC<Props> = ({ children }: Props) => {
  const [toastAttributes, setToastAttributes] = useState<ToastType>({
    message: ''
  });

  const toggleToast = (toastAttributes: ToastType): void =>
    setToastAttributes(toastAttributes);

  return (
    <ToastContext.Provider value={toastAttributes}>
      <ToggleToastContext.Provider value={toggleToast}>
        {children}
      </ToggleToastContext.Provider>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
