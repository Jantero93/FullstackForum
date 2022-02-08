/** Services */
import * as UserService from '../services/userService';

/** Types */
import { Response, Request, NextFunction } from 'express';

/** Utils */
import { accessTokenName } from '../config/config';
import logger from '../utils/logger';
import ResponseError from '../utils/ApplicationError';

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('User Controller', deleteUser.name);

  try {
    if (!req.admin) res.sendStatus(403);

    UserService.deleteOne(req.params.id);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('User Controller', getAllUsers.name);

  try {
    if (!req.admin) res.sendStatus(403);
    res.status(200).send(await UserService.findAll());
  } catch (error) {
    next(
      new ResponseError('Internal Server Error', 500, 'INTERNAL_SERVER_ERROR')
    );
  }
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
    httpOnly: true,
    secure: true
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

export const saveOne = async (req: Request, res: Response) => {
  logger.printStack('User Controller', saveOne.name);
  const { username, password } = req.body;
  const savedUser = await UserService.saveUser(username, password);

  res.send({
    id: savedUser.id,
    username: savedUser.username
  });
};
