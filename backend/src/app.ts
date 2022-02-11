/** TypeORM and Express */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';

/** Routes */
import routes from './routes/indexRoutes';

/** Middleware */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import {
  errorLogger,
  errorResponser,
  requestLogger,
  unknownEndpoint
} from './utils/middleware';

/** Utils */
import logger from './utils/logger';
import { DB_CONNECTION_SETTINGS } from './config/typeorm';

const app = express();

createConnection(DB_CONNECTION_SETTINGS)
  .then(() => {
    app.use(express.static('../frontend/build'));
    app.use(helmet());
    app.use(cookieParser());
    app.use(cors());
    app.use(
      express.urlencoded({
        extended: true
      })
    );
    app.use(express.json());

    app.use(requestLogger);

    /** All routes */
    app.use('/', routes);
    app.use(unknownEndpoint);

    app.use(errorLogger);
    app.use(errorResponser);
  })
  .catch((error) => logger.error(error));

export default app;
