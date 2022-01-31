import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** UI */

/** Types */
import { Board as BoardType } from '../../types/forum';

/** Utils */
import BoardService from '../../services/boardService';
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography
} from '@mui/material';

const HomePage: React.FC = (): JSX.Element => {
  const [boards, setBoards] = React.useState<BoardType[]>([]);

  useEffect(() => {
    BoardService.getAllBoards().then((response) => setBoards(response));
  }, []);

  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
    >
      {boards.map((board) => (
        <Card
          sx={{ minWidth: 275 }}
          key={board.board}
          style={{ backgroundColor: 'whitesmoke', margin: '0.5em' }}
        >
          <CardActionArea onClick={() => navigate(board.board)}>
            <CardContent>
              <Typography
                sx={{ mb: 1 }}
                variant="h5"
                style={{ color: '#0066cc' }}
              >
                {board.board}
              </Typography>
              <Typography sx={{ mb: 0.5 }} color="text.secondary">
                {board.adjective}
              </Typography>
              <Typography variant="body2">
                {
                  'Jotain dataa vaikka topicien/viestin joskus kun on tietokanta'
                }
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
};

export default HomePage;
