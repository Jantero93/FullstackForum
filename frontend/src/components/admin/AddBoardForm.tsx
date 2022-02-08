import React, { SetStateAction } from 'react';

/** UI */
import { Stack, Typography, TextField, Button } from '@mui/material';

/** Utils */
import BoardService from '../../services/boardService';

/** Types */
import { Board } from '../../types/forum';
import { useToastUpdate } from '../../contexts/ToastContext';
import { useSetShowAdminLogin } from '../../contexts/AdminLoginContext';

type Props = {
  setTabIndex: React.Dispatch<SetStateAction<number>>;
};

const AddBoardForm: React.FC<Props> = ({ setTabIndex }: Props): JSX.Element => {
  const [boardName, setBoardName] = React.useState<string>('');
  const [adjective, setAdjective] = React.useState<string>('');

  const showToast = useToastUpdate();
  const setShowAdminLogin = useSetShowAdminLogin();

  const postNewBoard = () => {
    const newBoard: Board = { board: boardName, adjective: adjective };
    BoardService.postBoard(newBoard)
      .then((_response) => {
        setTabIndex(0);
      })
      .catch(() => {
        setShowAdminLogin(true)
        showToast({ message: 'Token expired, login again', error: true });
      });
  };

  return (
    <Stack
      alignItems="flex-start"
      direction="column"
      justifyContent="flex-start"
      spacing={1.5}
      style={{ margin: '1.5em' }}
    >
      <Typography style={{ color: 'whitesmoke' }}>Board</Typography>
      <TextField
        fullWidth
        placeholder="Board name..."
        variant={'filled'}
        style={{ backgroundColor: 'whitesmoke' }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBoardName(e.target.value)
        }
      />
      <Typography style={{ color: 'whitesmoke' }}>Description</Typography>
      <TextField
        fullWidth
        maxRows={100}
        minRows={4}
        multiline
        placeholder="Description..."
        value={adjective}
        style={{ backgroundColor: 'whitesmoke' }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAdjective(e.target.value)
        }
      />
      <Button
        size="large"
        variant="contained"
        style={{ marginTop: '1em' }}
        onClick={() => postNewBoard()}
      >
        Post
      </Button>
    </Stack>
  );
};

export default AddBoardForm;
