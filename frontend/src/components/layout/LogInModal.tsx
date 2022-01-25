import React, { Dispatch, SetStateAction, useState } from 'react';

/** UI, CSS */
import { modalStyle } from '../../utils/modalstyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormGroup from '@mui/material/FormGroup';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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

  const handleLogInClick = (): void =>
    // eslint-disable-next-line no-console
    console.log(`login ${username} ${password}`);

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
