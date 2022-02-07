/** Types */
import { Response, Request, NextFunction } from 'express';
import ResponseError from '../utils/ApplicationError';

import config from '../config/config';
import logger from '../utils/logger';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Admin Controller', adminLogin.name);
  try {
    if (req.body.password === config.ADMIN_PANEL_PASSWORD) {
      const hash = await bcrypt.hash(req.body.password, 10);

      const token = jwt.sign({ admin: hash }, config.TOKEN_SECRET, {
        expiresIn: 60 * 60
      });

      res.cookie('admin', token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: true
      });

      res.status(200).send({ message: 'Successful admin login' });
    }
  } catch (error) {
    next(new ResponseError('Failed admin login', 401, 'AUTHORIZATION_FAILED'));
  }
};
