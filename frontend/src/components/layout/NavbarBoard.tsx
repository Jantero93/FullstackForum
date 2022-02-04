import { Link } from '@mui/material';
import React from 'react';
import { LinkProps } from 'react-router-dom';
import { Board } from '../../types/forum';

type Props = {
  board: Board;
  RouterLink: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
};

const NavbarBoards: React.FC<Props> = ({
  board,
  RouterLink
}: Props): JSX.Element => {
  return (
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
  );
};

export default NavbarBoards;
