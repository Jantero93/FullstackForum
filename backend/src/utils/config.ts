import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI: string =
  process.env.NODE_ENV === 'production'
    ? (process.env.MONGODB_URI as string)
    : (process.env.MONGODB_TEST_URI as string);

export default {
  PORT: (process.env.PORT as string) || '8080',
  MONGODB_URI
};
