/** React */
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

/** Components */
import LogInModal from './LogInModal';
import NavbarBoard from './NavbarBoard';
import SignUpModal from './SignUpModal';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /** Hooks */
  const user = useUser();
  const userUpdate = useUpdateUser();
  const showToast = useToastUpdate();
  const navigate = useNavigate();

  useEffect(() => {
    BoardService.getAllBoards()
      .then((response) => setBoards(response))
      .then(() => setIsLoading(true));
  }, []);

  const renderBoards = (): JSX.Element[] =>
    [{ board: 'Home', adjective: '' }, ...boards].map((board) => (
      <NavbarBoard RouterLink={RouterLink} board={board} key={board.board} />
    ));

  const handleLogOut = (): Promise<void> =>
    UserService.logOutUser().then(() => {
      userUpdate({ username: undefined, loggedIn: false });
      localStorage.clear();
      navigate('/');
      showToast({ message: 'Logged out' });
    });

  const handleLogin = (): void => {
    if (!user.loggedIn) {
      setShowLogIn(true);
      localStorage.clear();
    } else handleLogOut();
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: '#0a1929',
        marginBottom: '0.5em'
      }}
    >
      {isLoading && (
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
            <div
              style={{
                justifyContent: 'space-around',
                alignItems: 'baseline',
                display: 'flex'
              }}
            >
              {user.loggedIn && (
                <Typography
                  variant={'button'}
                  style={{ paddingRight: '1em', color: '#1976d2' }}
                >
                  {`Logged-in as ${user.username}`}
                </Typography>
              )}
              <Button variant={'contained'} style={{marginRight: '0.5em'}} onClick={handleLogin}>
                {user.loggedIn ? 'Logout' : 'Login'}
              </Button>
              {!user.loggedIn && (
                <Button
                  variant={'outlined'}
                  onClick={() => setShowSignUp(true)}
                >
                  Sign-up
                </Button>
              )}
            </div>
          </Grid>
        </Container>
      )}
      <SignUpModal showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
      <LogInModal showLogIn={showLogIn} setShowLogIn={setShowLogIn} />
    </AppBar>
  );
};

export default NavBar;
