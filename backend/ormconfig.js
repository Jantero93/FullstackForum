/* eslint-disable no-undef */
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities:
    NODE_ENV === 'production' ? ['dist/entity/*.js'] : ['entity/**/*.ts'],
  migrations:
    NODE_ENV === 'production' ? ['dist/migration/*.js'] : ['migration/**/*.ts'],
  subscribers:
    NODE_ENV === 'production'
      ? ['dist/subscriber/*.js']
      : ['subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'entity',
    migrationsDir: 'migration',
    subscribersDir: 'subscriber'
  }
};
