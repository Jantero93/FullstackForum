/** React */
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

/** Components */
import LogInModal from '../layout/LogInModal';
import NavbarBoard from './NavbarBoard';
import SignUpModal from '../layout/SignUpModal';

/** UI  */
import { AppBar, Button, Container, Grid, Toolbar } from '@mui/material';

/** Services */
import BoardService from '../../services/boardService';
import UserService from '../../services/userServices';

/** Forum boards */
import { Board } from '../../types/forum';

const NavBar: React.FC = (): JSX.Element => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showLogIn, setShowLogIn] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    BoardService.getAllBoards().then((response) => setBoards(response));
  }, []);

  const renderBoards = (): JSX.Element[] =>
    [{ board: 'Home', adjective: '' }, ...boards].map((board) => (
      <NavbarBoard RouterLink={RouterLink} board={board} key={board.board} />
    ));

  const handleLogOut = (): Promise<void> =>
    UserService.logOutUser().then(() => setIsLogged(false));

  const handleLogin = (): void => {
    !isLogged ? setShowLogIn(true) : handleLogOut();
  };

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
            {renderBoards()}
          </Toolbar>
          <div>
            <Button onClick={handleLogin}>
              {isLogged ? 'Logout' : 'Login'}
            </Button>
            {!isLogged && (
              <Button onClick={() => setShowSignUp(true)}>Sign-up</Button>
            )}
          </div>
        </Grid>
      </Container>
      <SignUpModal showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
      <LogInModal
        showLogIn={showLogIn}
        setShowLogIn={setShowLogIn}
        setIsLogged={setIsLogged}
      />
    </AppBar>
  );
};

export default NavBar;
