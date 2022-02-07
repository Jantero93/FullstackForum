import React from 'react';

/** UI */
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import Delete from '@mui/icons-material/Delete';

/** Utils */
import BoardService from '../../services/boardService';
import { useToastUpdate } from '../../contexts/ToastContext';

/** Types */
import { Board } from '../../types/forum';

const ManageBoards: React.FC = (): JSX.Element => {
  const [boards, setBoards] = React.useState<Board[]>([]);
  const [boardName, setBoardName] = React.useState<string>('');
  const [adjective, setAdjective] = React.useState<string>('');

  const showToast = useToastUpdate();

  React.useEffect(() => {
    BoardService.getAllBoards().then((response) => setBoards(response));
  }, []);

  const deleteBoardClicked = (id: string, boardName: string): void => {
    window.confirm(`Are you sure you want to delete ${boardName}`) &&
      BoardService.deleteBoard(id)
        .then(() =>
          showToast({ message: 'Deleted successfully', error: false })
        )
        .catch(() => showToast({ message: 'Delete failed', error: true }));
  };

  return (
    <div>
      <List>
        {boards.map((board) => (
          <ListItem
            key={board.board}
            divider
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteBoardClicked(board.id!, board.board)}
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
            <ListItemText primary={board.board} secondary={board.adjective} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ManageBoards;
