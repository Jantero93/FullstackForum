import { Pool } from 'pg';

import config from './utils/config';

export default new Pool({
  user: config.PG_USER,
  database: config.PG_DATABASE,
  password: config.PG_PASSWORD,
  host: config.PG_HOST,
  port: config.PG_PORT
});
