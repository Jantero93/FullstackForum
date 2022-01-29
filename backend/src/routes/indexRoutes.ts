import { Router } from 'express';

/** Routes */
import userRoutes from './userRoutes';
import boardRoutes from './boardRoutes';

const routes = Router();

routes.use('/api/user', userRoutes);
routes.use('/api/board', boardRoutes);

export default routes;
