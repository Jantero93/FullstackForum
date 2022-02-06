/** React */
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

/** Components */
import LogInModal from '../layout/LogInModal';
import NavbarBoard from './NavbarBoard';
import SignUpModal from '../layout/SignUpModal';

/** UI  */
import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography
} from '@mui/material';

/** Services */
import BoardService from '../../services/boardService';
import UserService from '../../services/userServices';

/** Forum boards */
import { Board } from '../../types/forum';

/** Contexts */
import { useUser, useUpdateUser } from '../../contexts/UserContext';
import { useToastUpdate } from '../../contexts/ToastContext';

const NavBar: React.FC = (): JSX.Element => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showLogIn, setShowLogIn] = useState<boolean>(false);

  const user = useUser();
  const userUpdate = useUpdateUser();
  const showToast = useToastUpdate();

  useEffect(() => {
    BoardService.getAllBoards().then((response) => setBoards(response));
  }, []);

  const renderBoards = (): JSX.Element[] =>
    [{ board: 'Home', adjective: '' }, ...boards].map((board) => (
      <NavbarBoard RouterLink={RouterLink} board={board} key={board.board} />
    ));

  const handleLogOut = (): Promise<void> =>
    UserService.logOutUser()
      .then(() => userUpdate({ username: undefined, loggedIn: false }))
      .then(() => showToast({ message: 'Logged out' }));

  const handleLogin = (): void => {
    !user.loggedIn ? setShowLogIn(true) : handleLogOut();
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
              {user.loggedIn ? 'Logout' : 'Login'}
            </Button>
            {!user.loggedIn && (
              <Button onClick={() => setShowSignUp(true)}>Sign-up</Button>
            )}
          </div>
        </Grid>
      </Container>
      <SignUpModal showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
      <LogInModal showLogIn={showLogIn} setShowLogIn={setShowLogIn} />
    </AppBar>
  );
};

export default NavBar;
