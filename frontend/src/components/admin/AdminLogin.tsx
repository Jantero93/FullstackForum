import React from 'react';

/** Components */
import AdminPanel from './AdminPanel';

/** UI */
import { Stack, Typography, TextField, Button } from '@mui/material';

/** Utils */
import UserService from '../../services/userServices';
import {
  useShowLogin,
  useSetShowAdminLogin
} from '../../contexts/AdminLoginContext';

/** Types */
import CSS from 'csstype';

const textAreaStyles: CSS.Properties = {
  backgroundColor: 'white',
  border: '1px solid black'
};

const AdminLogin: React.FC = (): JSX.Element => {
  const [password, setPassword] = React.useState<string>('');
  const [showError, setShowError] = React.useState<boolean>(false);

  const showLogin = useShowLogin();
  const setShowLogin = useSetShowAdminLogin();

  const adminLoginClicked = (): Promise<void> =>
    UserService.loginAdmin(password)
      .then(() => setShowLogin(false))
      .catch(() => setShowError(true));

  return (
    <React.Fragment>
      {!showLogin ? (
        <AdminPanel />
      ) : (
        <Stack
          alignItems="center"
          direction="column"
          justifyContent="flex-start"
          spacing={0.5}
          style={{ margin: '1.5em' }}
        >
          <Typography style={{ color: 'whitesmoke' }}>
            Master password
          </Typography>
          <TextField
            error={showError}
            value={password}
            style={textAreaStyles}
            type="password"
            helperText={showError ? 'incorrect password' : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              setShowError(false);
            }}
          />
          <Button
            size="large"
            variant="contained"
            style={{ marginTop: '1em' }}
            onClick={() => adminLoginClicked()}
          >
            Login
          </Button>
        </Stack>
      )}
    </React.Fragment>
  );
};

export default AdminLogin;
