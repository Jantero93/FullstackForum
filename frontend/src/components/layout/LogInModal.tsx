import React, { Dispatch, SetStateAction, useState } from 'react';

/** UI, CSS */
import {
  Box,
  Button,
  ButtonGroup,
  FormGroup,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import { modalStyle } from '../../utils/modalstyles';

/** Utils */
import UserService from '../../services/userServices';
import { saveToLocalStorage } from '../../utils/localStorage';
import { useUpdateUser } from '../../contexts/UserContext';
import { useToastUpdate } from '../../contexts/ToastContext';

type Props = {
  showLogIn: boolean;
  setShowLogIn: Dispatch<SetStateAction<boolean>>;
};

const LogInModal: React.FC<Props> = ({
  showLogIn,
  setShowLogIn
}: Props): JSX.Element => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  /** Hooks */
  const updateUser = useUpdateUser();
  const showToast = useToastUpdate();

  const handleLogInClick = (): void => {
    UserService.loginUser(username, password)
      .then((response) => {
        updateUser({
          loggedIn: true,
          username: response.username,
          id: response.id,
          role: response.role
        });
        saveToLocalStorage('user', response);
        setShowLogIn(false);
        showToast({ message: 'Logged in' });
      })
      .catch((e) => {
        setShowError(true);
        showToast({ message: 'Login failed', error: true });
      });
  };

  return (
    <Modal
      open={showLogIn}
      onClose={() => setShowLogIn(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <FormGroup>
          <Typography component="div" gutterBottom variant="h6">
            Login
          </Typography>
          <TextField
            data-cy="login-input-username"
            id="outlined-error"
            error={showError}
            label="Username"
            required
            style={{ marginTop: '1em' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserName(e.target.value);
              setShowError(false);
            }}
          />
          <TextField
            data-cy="login-input-password"
            id="outlined-error"
            error={showError}
            label="Password"
            required
            type="password"
            style={{ marginTop: '1em' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              setShowError(false);
            }}
          />
          <ButtonGroup
            disableElevation
            fullWidth
            variant="contained"
            style={{ marginTop: '2em' }}
          >
            <Button
              data-cy="login-button"
              style={{ margin: '1em' }}
              onClick={() => {
                setShowError(false);
                handleLogInClick();
              }}
            >
              Log in
            </Button>
            <Button
              style={{ margin: '1em' }}
              onClick={() => {
                setShowLogIn(false);
                setShowError(false);
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </FormGroup>
      </Box>
    </Modal>
  );
};

export default LogInModal;
