import { NextFunction, Request, Response } from 'express';

/** Custom Error */
import ResponseError from './ApplicationError';

/** Utils */
import ApplicationError from './ApplicationError';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import logger from './logger';
import isUUID from 'validator/lib/isUUID';
import { request } from 'http';

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
  err: ResponseError,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  logger.error(err);
  next(err);
};

export const errorResponser = (
  err: ResponseError,
  _req: Request,
  res: Response
) => {
  switch (err.errorType) {
    case 'INVALID_ID':
      res.status(err.statusCode).send({ error: err.message });

    case 'UNKNOWN_ENDPOINT':
      res.status(err.statusCode).send({ error: err.message });

    default:
      res.sendStatus(500);
  }
};

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

export const unknownEndpoint = (_req: Request, _res: Response) => {
  throw new ApplicationError('Unknown endpoint', 404, 'UNKNOWN_ENDPOINT');
};

export const isUUIDValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isUUID(req.params.id)) next();
  else throw new ApplicationError('Invalid ID', 400, 'INVALID_ID');
};
