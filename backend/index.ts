/** 3rd dependencies */
import { createServer, Server } from 'http';

const server: Server = createServer();

try {
  server.listen(8080, (): void => {
    console.log(`Connected successfully on port ${8080}`);
  });
} catch (error) {
  console.error(`Error occurred ${(error as any).message}`);
}
