import React from 'react';

import AppBar from '@mui/material/AppBar';

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const NavBar: React.FC = () => {
  const forums: string[] = ['JavaScript', 'TypeScript', 'Java', 'C++', 'Misc'];

  const forumNameClicked = (forumName: string): void => console.log(forumName);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {forums.map((forumName) => (
            <Typography
              key={forumName}
              noWrap
              sx={{ mr: 2, display: { xs: 'flex' } }}
              id={forumName}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={(e: any) => forumNameClicked(e.target.id)}
            >
              {forumName}
            </Typography>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
