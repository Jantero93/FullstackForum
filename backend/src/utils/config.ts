import dotenv from 'dotenv';
dotenv.config();

export default {
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD as string,
  PG_HOST: process.env.PG_HOST,
  PG_PORT: parseInt(process.env.PG_PORT as string) || 5432,
  PG_DATABASE: process.env.PG_DATABASE,
  PORT: parseInt(process.env.PORT as string) || 8080
};
