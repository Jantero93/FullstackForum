/** React */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** UI  */
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';

const NavBar: React.FC = () => {
  const forums: string[] = [
    'Home',
    'C++',
    'Java',
    'TypeScript',
    'Cats',
    'Misc'
  ];

  const navigate = useNavigate();

  const forumNameClicked = (forumName: string): void => {
    if (forumName === 'C++') navigate('c');
    else if (forumName === 'Home') navigate('/');
    else navigate(forumName.toLowerCase());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {forums.map((forumName) => (
            <Link
              style={{ color: 'white', cursor: 'pointer' }}
              key={forumName}
              noWrap
              sx={{ mr: 2, display: { xs: 'flex' } }}
              id={forumName}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={(e: any) => forumNameClicked(e.target.id)}
            >
              {forumName}
            </Link>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
