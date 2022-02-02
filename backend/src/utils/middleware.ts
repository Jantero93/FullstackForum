import { NextFunction, Request, Response } from 'express';

/** Utils */
import logger from './logger';

/**
 * Get authorization code from header and put it in request
 */
export const tokenExtractor = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authorization = req.get('authorization');

  req.token =
    authorization && authorization.toLowerCase().startsWith('bearer')
      ? authorization.substring(7)
      : null;

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
  logger.info('Method: ', request.method);
  logger.info('Path: ', request.path);
  logger.info('Request params', request.params);
  logger.info('Body: ', request.body);
  logger.info('---');
  next();
};
