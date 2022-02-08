/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from 'react';

/** Default values */
const AdminLoginContext = React.createContext(true);
const ToggleAdminLoginContext = createContext((setShowLogin: boolean) => {});

/** Custom hooks */
export const useShowLogin = (): boolean => useContext(AdminLoginContext);
export const useSetShowAdminLogin = (): ((showLogin: boolean) => void) =>
  useContext(ToggleAdminLoginContext);

interface Props {
  children: React.ReactNode;
}

const AdminLoginProvider: React.FC<Props> = ({ children }: Props): JSX.Element => {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const toggleAdminLogin = (showLogin: boolean): void =>
    setShowLogin(showLogin);

  return (
    <AdminLoginContext.Provider value={showLogin}>
      <ToggleAdminLoginContext.Provider value={toggleAdminLogin}>
        {children}
      </ToggleAdminLoginContext.Provider>
    </AdminLoginContext.Provider>
  );
};

export default AdminLoginProvider;
