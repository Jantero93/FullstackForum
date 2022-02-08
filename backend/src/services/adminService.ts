/** Utils */
import config from '../config/config';
import logger from '../utils/logger';
import jwt from 'jsonwebtoken';

export const getAdminToken = (password: string): string => {
  logger.printStack('Admin Service', getAdminToken.name);

  return jwt.sign({ adminPassword: password }, config.TOKEN_SECRET, {
    expiresIn: 60 * 20
  });
};
