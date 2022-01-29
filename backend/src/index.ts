import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import routes from './routes/indexRoutes';
import cors from 'cors';

import Config from './utils/config';
import { requestLogger } from './utils/middleware';

createConnection()
  .then(async (_connection) => {
    const app = express();
    app.use(
      express.urlencoded({
        extended: true
      })
    );
    app.use(cors());
    app.use(express.json());

    app.use(requestLogger);

    /** Initialize routes */
    app.use('/', routes);

    app.listen(Config.PORT);

    console.log(
      `Express server has started on port ${Config.PORT}. Open http://localhost:${Config.PORT}/api/user to see all users`
    );
  })
  .catch((error) => console.log(error));
