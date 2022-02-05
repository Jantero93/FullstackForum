import { NextFunction, Request, Response } from 'express';

/** Utils */
import config from '../config/config';
import jwt from 'jsonwebtoken';
import logger from './logger';

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.access_token;

  //! Error handling
  if (!token) {
    res.sendStatus(403);
    return;
  }

  !token && res.sendStatus(403);
  const data = jwt.verify(token, config.TOKEN_SECRET) as {
    [key: string]: string;
  };

  //! data fails, error handling
  req.userId = data.id;
  req.username = data.username;

  next();
};

/**
 * Logs incoming request
 */
export const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  logger.info('Cookies: ', request.cookies?.access_token);
  logger.info('Method: ', request.method);
  logger.info('Path: ', request.path);
  logger.info('Request params ', request.params);
  logger.info('Body: ', request.body);
  logger.info('---');
  next();
};
