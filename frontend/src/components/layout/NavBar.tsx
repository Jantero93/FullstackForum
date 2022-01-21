/** React */
import React, { useState } from 'react';

/** Components */
import LogInModal from '../layout/LogInModal';
import SignUpModal from '../layout/SignUpModal';

/** UI  */
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';

/** Forum boards */
import { boards } from '../../types/boards';

const NavBar: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showLogIn, setShowLogIn] = useState<boolean>(false);

  const urlParameter = (forumName: string): string => {
    if (forumName === 'C++') return 'c';
    else if (forumName === 'Home') return '/';
    else return forumName.toLowerCase();
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#0a1929' }}>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Toolbar disableGutters variant={'dense'}>
            {boards.map((forumName) => (
              <Link
                key={forumName}
                noWrap
                sx={{ mr: 2, display: { xs: 'flex' } }}
                style={{
                  color: forumName === 'Home' ? 'whitesmoke' : '#66b2ff',
                  cursor: 'pointer'
                }}
                href={urlParameter(forumName)}
              >
                {forumName}
              </Link>
            ))}
          </Toolbar>
          <div>
            <Button onClick={() => setShowLogIn(true)}>Log in</Button>
            <Button onClick={() => setShowSignUp(true)}>Sign up</Button>
          </div>
        </Grid>
      </Container>
      <SignUpModal showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
      <LogInModal showLogIn={showLogIn} setShowLogIn={setShowLogIn} />
    </AppBar>
  );
};

export default NavBar;
