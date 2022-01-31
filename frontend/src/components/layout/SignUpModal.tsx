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

  const handleSignInClick = (): void =>
    // eslint-disable-next-line no-console
    console.log(`sign in ${username} ${password}`);

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
              onClick={() => handleSignInClick()}
            >
              Sign up
            </Button>
            <Button
              style={{ margin: '1em' }}
              onClick={() => setShowSignUp(false)}
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
