import { NextFunction, Request, Response } from 'express';

/** Utils */
import config from '../config/config';
import jwt from 'jsonwebtoken';
import logger from './logger';
import isUUID from 'validator/lib/isUUID';

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.access_token;

  //! Error handling
  if (!token) {
    res.sendStatus(403);
  }

  const data = jwt.verify(token, config.TOKEN_SECRET) as {
    [key: string]: string;
  };

  //! data fails, error handling
  req.userId = data.id;
  req.username = data.username;

  next();
};

/** Log error */
export const errorLogger = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  logger.error(err);
  next(err);
};

export const failSafeHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => res.status(500).send('Something went broken!');

/** Log incoming requests */
export const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  logger.info('Timestamp: ', new Date().toLocaleTimeString('de-DE'));
  logger.info('Cookies: ', request.cookies?.access_token);
  logger.info('Method: ', request.method);
  logger.info('Path: ', request.path);
  logger.info('Request params ', request.params);
  logger.info('Body: ', request.body);
  logger.info('---');
  next();
};

export const unknownEndpoint = (_req: Request, res: Response) =>
  res.status(404).send({ error: 'Unknown endpoint' });

export const isUUIDValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  isUUID(req.params.id)
    ? next()
    : res.status(400).send({ error: 'Not valid topic ID' });
};
