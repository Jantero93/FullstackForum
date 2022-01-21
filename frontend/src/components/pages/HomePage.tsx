import React from 'react';

/** UI */
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardContent, Typography, CardActionArea } from '@mui/material';
import Link from '@mui/material/Link';

/** Boards */
import { boards } from '../../types/boards';

/** Utils */
import { boardNameToUrlParameter } from '../../utils/routerUtils';

const HomePage: React.FC = () => {
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
          <CardActionArea href={boardNameToUrlParameter(board.name)}>
            <CardContent>
              <Link variant="h5" component="div">
                {board.name}
              </Link>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
