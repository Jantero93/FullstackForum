import { Router } from 'express';

/** Routes */
import userRoutes from './userRoutes';
import boardRoutes from './boardRoutes';
import topicRoutes from './topicRoutes';
import postRoutes from './postRoutes';
import adminRoutes from './adminRoutes';

const routes = Router();

routes.use('/api/admin', adminRoutes);
routes.use('/api/user', userRoutes);
routes.use('/api/board', boardRoutes);
routes.use('/api/topic', topicRoutes);
routes.use('/api/post', postRoutes);

export default routes;
