/** Services */
import * as UserService from '../services/userService';

/** Types */
import { Response, Request } from 'express';

import { accessTokenName } from '../config/config';
import logger from '../utils/logger';

export const saveOne = async (req: Request, res: Response) => {
  logger.printStack('User Controller', saveOne.name);
  const { username, password } = req.body;
  const savedUser = await UserService.saveUser(username, password);

  res.send({
    id: savedUser.id,
    username: savedUser.username
  });
};

export const login = async (req: Request, res: Response) => {
  logger.printStack('User Controller', login.name);
  const { username, password } = req.body;

  const userFromDB = await UserService.findUserByUsername(username);

  const isUserVerified = await UserService.verifyUser(userFromDB, password);

  const token: string | null = isUserVerified
    ? await UserService.getToken(userFromDB.username, userFromDB.id)
    : null;

  if (!token) {
    res.status(401).send({ error: 'Login failed' });
    return;
  }

  res.cookie(accessTokenName, token, {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 50,
    httpOnly: false,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  });

  userFromDB.passwordHash = '';

  res.send({
    ...userFromDB
  });
};

export const logout = async (_req: Request, res: Response) => {
  logger.printStack('User Controller', logout.name);
  res.clearCookie(accessTokenName);
  res.send('Logged out successfully');
};
