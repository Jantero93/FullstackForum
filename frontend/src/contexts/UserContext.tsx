import React from 'react';

export type User = {
  username?: string;
  loggedIn: boolean;
};

/** Default values */
const UserContext = React.createContext({
  loggedIn: false
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const SetUserContext = React.createContext((user: User) => {});

export const useUser = (): User => React.useContext(UserContext);
export const useUpdateUser = (): ((user: User) => void) =>
  React.useContext(SetUserContext);

type Props = {
  children: React.ReactNode;
};

const UserProvider: React.FC<Props> = ({ children }: Props): JSX.Element => {
  const [user, setUser] = React.useState<User>({ loggedIn: false });

  const updateUser = (user: User): void => setUser(user);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={updateUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
