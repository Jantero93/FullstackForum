import dotenv from 'dotenv';

dotenv.config();

/** Cookie name where access token is set */
export const accessTokenName = 'access_token';

export default {
  ADMIN_PANEL_PASSWORD: process.env.ADMIN_PANEL_PASSWORD as string,
  PORT: parseInt(process.env.PORT as string),
  TOKEN_SECRET: process.env.TOKEN_SECRET as string
};
