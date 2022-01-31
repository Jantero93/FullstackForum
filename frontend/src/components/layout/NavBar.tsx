/** React */
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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

/** Services */
import BoardService from '../../services/boardService';

/** Forum boards */
import { Board } from '../../types/forum';

const NavBar: React.FC = (): JSX.Element => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showLogIn, setShowLogIn] = useState<boolean>(false);

  useEffect(() => {
    BoardService.getAllBoards().then((response) => setBoards(response));
  }, []);

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: '#0a1929',
        marginBottom: '0.5em'
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Toolbar disableGutters variant={'regular'}>
            {[{ board: 'Home', adjective: '' }, ...boards].map((board) => (
              <Link
                component={RouterLink}
                to={board.board === 'Home' ? '/' : board.board}
                key={board.board}
                noWrap
                sx={{ mr: 2, display: { xs: 'flex' } }}
                style={{
                  color: board.board === 'Home' ? 'whitesmoke' : '#66b2ff',
                  cursor: 'pointer'
                }}
              >
                {board.board}
              </Link>
            ))}
          </Toolbar>
          <div>
            <Button onClick={() => setShowLogIn(true)}>Login</Button>
            <Button onClick={() => setShowSignUp(true)}>Sign-up</Button>
          </div>
        </Grid>
      </Container>
      <SignUpModal showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
      <LogInModal showLogIn={showLogIn} setShowLogIn={setShowLogIn} />
    </AppBar>
  );
};

export default NavBar;
