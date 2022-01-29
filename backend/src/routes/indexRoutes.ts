import { Router } from 'express';

/** Routes */
import userRoutes from './userRoutes';
import boardRoutes from './boardRoutes';
import topicRoutes from './topicRoutes';

const routes = Router();

routes.use('/api/user', userRoutes);
routes.use('/api/board', boardRoutes);
routes.use('/api/topic', topicRoutes);

export default routes;
