import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI: string =
  process.env.NODE_ENV === 'production'
    ? (process.env.MONGODB_URI as string)
    : (process.env.MONGODB_TEST_URI as string);

export default {
  MONGODB_URI,
  PG_USER: process.env.PG_PASSWORD,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_HOST: process.env.PG_HOST,
  PG_PORT: parseInt(process.env.PG_PORT as string) || 5432,
  PG_DATABASE: process.env.PG_DATABASE,
  PORT: parseInt(process.env.PORT as string) || 8080
};
