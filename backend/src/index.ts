import { createServer, Server } from 'http';

/** Utils */
import logger from './utils/logger';

/** Config */
import Config from './utils/Config';

import app from './app';

const server: Server = createServer(app);

try {
  server.listen(Config.PORT, (): void => {
    logger.info(`Connected successfully on port ${Config.PORT}`);
  });
} catch (error) {
  logger.error(`Error occurred ${(error as any).message}`);
}
