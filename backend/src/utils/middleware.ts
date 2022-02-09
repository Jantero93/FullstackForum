import { NextFunction, Request, Response } from 'express';

/** Custom Error */
import ResponseError from './ApplicationError';

/** Utils */
import ApplicationError from './ApplicationError';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import logger from './logger';
import isUUID from 'validator/lib/isUUID';
import colors from 'colors';

export const authorization = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  logger.printStack('Middleware', authorization.name);
  const token = req.cookies.access_token;

  if (!token) {
    next(new ResponseError('Authorization failed', 'AUTHORIZATION_FAILED'));
  }

  const data = jwt.verify(token, config.TOKEN_SECRET) as {
    [key: string]: string;
  };
  req.userId = data.id;
  req.username = data.username;
  req.admin = data.adminPassword === config.ADMIN_PANEL_PASSWORD;

  next();
};

/** Log error */
export const errorLogger = (
  err: ResponseError,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  logger.error(colors.red(err.name));
  next(err);
};

export const errorResponser = (
  err: ResponseError,
  _req: Request,
  res: Response
) => {
  logger.printStack('Middleware', errorResponser.name);

  const sendResponse = (res: Response, message: string, statusCode: number) =>
    res.status(statusCode).send({ error: message });

  switch (err.errorType) {
    case 'AUTHORIZATION_FAILED':
      sendResponse(res, err.message, 401);
    case 'ENTITY_NOT_FOUND':
      sendResponse(res, err.message, 404);
    case 'FAILED_DELETE_ENTITY':
      sendResponse(res, err.message, 404);
    case 'FORBIDDEN':
      sendResponse(res, err.message, 403);
    case 'INVALID_ID':
      sendResponse(res, err.message, 422);
    case 'NOT_FOUND':
      sendResponse(res, err.message, 404);
    case 'UNKNOWN_ENDPOINT':
      sendResponse(res, err.message, 404);
    case 'LOGIN_FAILED':
      sendResponse(res, err.message, 401);
    case 'CONFLICT':
      sendResponse(res, err.message, 409);
    case 'INVALID_REQUEST_BODY':
      sendResponse(res, err.message, 422);

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

export const unknownEndpoint = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  logger.printStack('Middleware', unknownEndpoint.name);
  next(new ApplicationError('Unknown endpoint', 'UNKNOWN_ENDPOINT'));
};

export const isUUIDValid = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  logger.printStack('Middleware', isUUIDValid.name);

  if (isUUID(req.params.id)) next();
  else next(new ApplicationError('Invalid ID', 'INVALID_ID'));
};
