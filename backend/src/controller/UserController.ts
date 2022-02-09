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
    if (!req.admin) throw new ResponseError('Forbidden', 'FORBIDDEN');
    else res.status(200).send(await UserService.findAll());
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('User Controller', login.name);

  try {
    const { username, password } = req.body;

    const userFromDB = await UserService.findUserByUsername(username);
    const isUserVerified = await UserService.verifyUser(userFromDB, password);

    const token: string | null = isUserVerified
      ? UserService.getToken(userFromDB.username, userFromDB.id)
      : null;

    if (!token) {
      throw new ResponseError('Login failed', 'LOGIN_FAILED');
    }

    res.cookie(accessTokenName, token, {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 50,
      httpOnly: true,
      secure: true
    });

    userFromDB.passwordHash = '';
    res.status(200).send({
      ...userFromDB
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('User Controller', logout.name);

  try {
    res.clearCookie(accessTokenName);
    res.send('Logged out successfully');
  } catch (error) {
    next(error);
  }
};

export const saveOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('User Controller', saveOne.name);

  try {
    const { username, password } = req.body;

    const savedUser = await UserService.saveUser(username, password);

    res.send({
      id: savedUser.id,
      username: savedUser.username
    });
  } catch (error) {
    next(error);
  }
};
