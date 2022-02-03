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

  const handleLogInClick = (): void => {
    UserService.loginUser(username, password).then((response) =>
      console.log(response)
    );
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
            id="outlined-error"
            label="Username"
            style={{ marginTop: '1em' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
          <TextField
            id="outlined-error"
            label="Password"
            type="password"
            style={{ marginTop: '1em' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <ButtonGroup
            disableElevation
            fullWidth
            variant="contained"
            style={{ marginTop: '2em' }}
          >
            <Button
              style={{ margin: '1em' }}
              onClick={() => handleLogInClick()}
            >
              Log in
            </Button>
            <Button
              style={{ margin: '1em' }}
              onClick={() => setShowLogIn(false)}
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
