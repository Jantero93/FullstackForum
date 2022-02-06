/** Services */
import * as UserService from '../services/userService';

/** Types */
import { Response, Request } from 'express';

import { accessTokenName } from '../config/config';

export const saveOne = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const savedUser = await UserService.saveUser(username, password);

  res.send({
    id: savedUser.id,
    username: savedUser.username
  });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userFromDB = await UserService.findUserByUsername(username);

  //! If user not verified throw error
  const isUserVerified = await UserService.verifyUser(userFromDB, password);

  const token: string | null = isUserVerified
    ? await UserService.getToken(userFromDB.username, userFromDB.id)
    : null;

  if (!token) {
    res.status(401).send({ error: 'Login failed' });
    return;
  }

  res.cookie(accessTokenName, token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 1000)
  });

  res.send({
    message: 'Logged in successfully'
  });
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie(accessTokenName);
  res.send('Logged out successfully');
};
