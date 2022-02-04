/** TypeORM and Express */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';

/** Routes */
import routes from './routes/indexRoutes';

/** Middleware */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { requestLogger } from './utils/middleware';

/** Utils */
import Config from './config/config';
import logger from './utils/logger';

createConnection()
  .then(async () => {
    const app = express();
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

    app.listen(Config.PORT);

    logger.info(`Express server has started on port ${Config.PORT}`);
  })
  .catch((error) => logger.error(error));
