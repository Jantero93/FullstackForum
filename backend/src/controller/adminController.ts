/** Types */
import { Response, Request, NextFunction } from 'express';
import ResponseError from '../utils/ApplicationError';

import config from '../config/config';
import logger from '../utils/logger';
import { accessTokenName } from '../config/config';

import * as AdminService from '../services/adminService';

export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Admin Controller', adminLogin.name);

  const { password } = req.body;

  try {
    if (password !== config.ADMIN_PANEL_PASSWORD) {
      res.sendStatus(403);
    }

    const adminToken: string | null = AdminService.getAdminToken(password);

    res.cookie(accessTokenName, adminToken, {
      maxAge: 1000 * 60 * 20,
      httpOnly: true,
      secure: true
    });

    res.sendStatus(200);
  } catch (error) {
    next(new ResponseError('Failed admin login', 401, 'AUTHORIZATION_FAILED'));
  }
};
