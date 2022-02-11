import path from 'path';

import { PG_URI } from './db';

import { ConnectionOptions } from 'typeorm';

const NODE_PRODUCTION = process.env.NODE_ENV === 'production';

/** All entities stored in src/entity folder */
const entitiesPath = path.join(
  __dirname,
  '..',
  NODE_PRODUCTION ? 'entity/*.js' : 'entity/*.ts'
);

export const DB_CONNECTION_SETTINGS: ConnectionOptions = {
  type: 'postgres',
  url: PG_URI,
  entities: [entitiesPath],
  synchronize: true,
  logging: NODE_PRODUCTION
};
