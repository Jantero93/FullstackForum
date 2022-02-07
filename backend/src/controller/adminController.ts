/** Types */
import { Response, Request, NextFunction } from 'express';
import ResponseError from '../utils/ApplicationError';

import config from '../config/config';
import logger from '../utils/logger';

export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Admin Controller', adminLogin.name);
  try {
    if (req.body.password === config.ADMIN_PANEL_PASSWORD) {
      res.status(200).send({ message: 'Successful admin login' });
    }
  } catch (error) {
    next(new ResponseError('Failed admin login', 401, 'AUTHORIZATION_FAILED'));
  }
};
