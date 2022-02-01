import { NextFunction, Request, Response } from 'express';
import logger from './logger';

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
