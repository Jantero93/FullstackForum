import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import routes from './routes/index';
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

    /** Initialize routes */
    app.use(requestLogger);
    app.use('/', routes);

    app.listen(Config.PORT);

    console.log(
      `Express server has started on port ${Config.PORT}. Open http://localhost:${Config.PORT}/users to see results`
    );
  })
  .catch((error) => console.log(error));
