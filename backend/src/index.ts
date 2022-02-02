/** TypeORM and Express */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';

/** Routes */
import routes from './routes/indexRoutes';

/** Middleware */
import cors from 'cors';
import { tokenExtractor, requestLogger } from './utils/middleware';

/** Utils */
import Config from './utils/config';
import logger from './utils/logger';

createConnection()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(
      express.urlencoded({
        extended: true
      })
    );
    app.use(express.json());

    app.use(requestLogger);
    app.use(tokenExtractor);

    /** All routes */
    app.use('/', routes);

    app.listen(Config.PORT);

    logger.info(`Express server has started on port ${Config.PORT}`);
  })
  .catch((error) => logger.error(error));
