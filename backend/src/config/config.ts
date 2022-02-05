import dotenv from 'dotenv';

dotenv.config();

/** Cookies name where access token is set */
export const accessTokenName = 'access_token';

/** 6h */
export const tokenExpirationTime = 60 * 60 * 6;

export default {
  ADMIN_PANEL_PASSWORD: process.env.ADMIN_PANEL_PASSWORD as string,
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD as string,
  PG_HOST: process.env.PG_HOST,
  PG_PORT: parseInt(process.env.PG_PORT as string),
  PG_DATABASE: process.env.PG_DATABASE,
  SERVER_PORT: parseInt(process.env.SERVER_PORT as string),
  TOKEN_SECRET: process.env.TOKEN_SECRET as string
};
