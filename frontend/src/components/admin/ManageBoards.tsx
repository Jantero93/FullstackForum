import React from 'react';

/** Components */
import ManageTopics from './ManageTopics';

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
import { useSetShowAdminLogin } from '../../contexts/AdminLoginContext';

const ManageBoards: React.FC = (): JSX.Element => {
  const [boards, setBoards] = React.useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = React.useState<Board | undefined>(
    undefined
  );

  const showToast = useToastUpdate();
  const setShowAdminLogin = useSetShowAdminLogin()

  React.useEffect(() => {
    BoardService.getAllBoards().then((response) => setBoards(response));
  }, []);

  const deleteBoardClicked = (id: string, boardName: string): void => {
    window.confirm(`Are you sure you want to delete ${boardName}`) &&
      BoardService.deleteBoard(id)
        .then(() =>
          showToast({ message: 'Deleted successfully', error: false })
        )
        .catch(() => {
          showToast({ message: 'Token expired, login again', error: true });
          setShowAdminLogin(true)
        });
  };

  const boardClicked = (board: Board) => setSelectedBoard(board);

  return (
    <>
      {selectedBoard ? (
        <ManageTopics
          boardName={selectedBoard.board}
          setSelectedBoard={setSelectedBoard}
        />
      ) : (
        <List>
          {boards.map((board) => (
            <ListItem
              key={board.board}
              divider
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  onClick={() => deleteBoardClicked(board.id!, board.board)}
                >
                  <Delete fontSize={'large'} htmlColor={'#000000'} />
                </IconButton>
              }
              style={{
                backgroundColor: 'whitesmoke',
                borderBottom: '1px solid black',
                cursor: 'pointer'
              }}
              onClick={() => boardClicked(board)}
            >
              <ListItemAvatar></ListItemAvatar>
              <ListItemText primary={board.board} secondary={board.adjective} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default ManageBoards;
