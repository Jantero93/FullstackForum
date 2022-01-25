import React from 'react';
import { useNavigate } from 'react-router-dom';

/** UI */
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** Boards */
import { boards } from '../../types/boards';

/** Utils */
import { boardNameToUrlParameter } from '../../utils/routerUtils';

const HomePage: React.FC = (): JSX.Element => {
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
          key={board.name}
          style={{ backgroundColor: 'whitesmoke', margin: '0.5em' }}
        >
          <CardActionArea
            onClick={() => navigate(boardNameToUrlParameter(board.name))}
          >
            <CardContent>
              <Typography
                sx={{ mb: 1 }}
                variant="h5"
                style={{ color: '#0066cc' }}
              >
                {board.name}
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
