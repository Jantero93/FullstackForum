/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

/** UI */
import { Delete } from '@mui/icons-material';
import {
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText
} from '@mui/material';

/** Utils */
import UserService from '../../services/userServices';
import { useToastUpdate } from '../../contexts/ToastContext';

/** Types */
import { User } from '../../types/forum';

const ManageUsers: React.FC = (): JSX.Element => {
  const [users, setUsers] = React.useState<User[]>([]);

  const showToast = useToastUpdate();

  React.useEffect(() => {
    UserService.getAllUsers().then((response) => setUsers(response));
  }, []);

  const deleteUserClicked = (userId: string): void => {
    UserService.deleteUser(userId)
      .then(() => setUsers(users.filter((user) => user.id! !== userId)))
      .catch(() => showToast({ message: 'Token expired, login again', error: true }));
  };

  return (
    <div>
      {users.map((user) => (
        <ListItem
          key={user.id!}
          divider
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e: React.MouseEvent<unknown>) =>
                deleteUserClicked(user.id!)
              }
            >
              <Delete fontSize={'large'} htmlColor={'#000000'} />
            </IconButton>
          }
          style={{
            backgroundColor: 'whitesmoke',
            borderBottom: '1px solid black'
          }}
        >
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={user.username!} />
        </ListItem>
      ))}
    </div>
  );
};

export default ManageUsers;
