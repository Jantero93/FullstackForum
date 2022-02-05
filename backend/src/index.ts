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
import * as middleware from './utils/middleware';
/** Utils */
import Config from './config/config';
import logger from './utils/logger';

createConnection()
  .then(async () => {
    const app = express();
    app.use(helmet());
    app.use(cookieParser());
    app.use(cors());
    app.use(
      express.urlencoded({
        extended: true
      })
    );
    app.use(express.json());

    app.use(middleware.requestLogger);

    /** All routes */
    app.use('/', routes);
    app.use(middleware.unknownEndpoint);

    app.use(middleware.errorLogger);
    app.use(middleware.failSafeHandler);

    app.listen(Config.SERVER_PORT);
    logger.info(`Express server has started on port ${Config.SERVER_PORT}`);
  })
  .catch((error) => logger.error(error));
