import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

/** Hooks */
import { useToastUpdate } from '../../contexts/ToastContext';
import { useUpdateUser } from '../../contexts/UserContext';
import { AxiosError } from 'axios';

type Props = {
  showSignUp: boolean;
  setShowSignUp: Dispatch<SetStateAction<boolean>>;
};

const SignUpModal: React.FC<Props> = ({
  showSignUp,
  setShowSignUp
}: Props): JSX.Element => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  /** Hooks */
  const navigate = useNavigate();
  const updateUser = useUpdateUser();
  const showToast = useToastUpdate();

  const handleSignInClick = (): void => {
    if (username.length < 3 || password.length < 6) {
      setShowError(true);
      return;
    }

    UserService.postUser(username, password)
      .then(() => UserService.loginUser(username, password))
      .then((response) => {
        updateUser({
          loggedIn: true,
          username: response.username,
          id: response.id,
          role: response.role
        });
        saveToLocalStorage('user', response);
        setShowSignUp(false);
        navigate('/');
        showToast({ message: 'User created', error: false });
      })
      .catch((e) => {
        setShowError(true);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        showToast({ message: (e as AxiosError).response!.data, error: true });
      });
  };

  return (
    <Modal
      open={showSignUp}
      onClose={() => setShowSignUp(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <FormGroup>
          <Typography variant="h6" gutterBottom component="div">
            Sign-in
          </Typography>
          <TextField
            data-cy="username-input"
            id="outlined-error"
            label="Username"
            helperText="Minimum 3 characters"
            error={showError}
            inputProps={{ maxLength: 30 }}
            required
            style={{ marginTop: '1em' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserName(e.target.value);
              setShowError(false);
            }}
          />
          <TextField
            data-cy="password-input"
            id="outlined-error"
            label="Password"
            helperText="Minimum 6 characters"
            error={showError}
            inputProps={{ maxLength: 50 }}
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
              data-cy="sign-up-button"
              style={{ margin: '1em' }}
              onClick={() => {
                setShowError(false);
                handleSignInClick();
              }}
            >
              Sign up
            </Button>
            <Button
              style={{ margin: '1em' }}
              onClick={() => {
                setShowSignUp(false);
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

export default SignUpModal;
