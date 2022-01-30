/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const config = require('./src/utils/config').default;

module.exports = {
  type: 'postgres',
  host: config.PG_HOST,
  port: config.PG_PORT,
  username: config.PG_USER,
  password: config.PG_PASSWORD,
  database: config.PG_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};
