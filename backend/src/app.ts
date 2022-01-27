/** Express */
import * as express from 'express';
import { Application } from 'express';

/** Utils */
import * as cors from 'cors';
import { requestLogger } from './utils/requestLogger';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(requestLogger);

app.get('/', (req, res) => res.send('express rules!'));

export default app;
