import React, { Dispatch, SetStateAction } from 'react';

/** UI */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

type Props = {
  showLogIn: boolean;
  setShowLogIn: Dispatch<SetStateAction<boolean>>;
};

const LogInModal: React.FC<Props> = ({ showLogIn, setShowLogIn }: Props) => {
  return (
    <div>
      <Modal
        open={showLogIn}
        onClose={() => setShowLogIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default LogInModal;
