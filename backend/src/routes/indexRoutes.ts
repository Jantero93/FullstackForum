import { Router } from 'express';

/** Routes */
import adminRoutes from './adminRoutes';
import boardRoutes from './boardRoutes';
import userRoutes from './userRoutes';
import postRoutes from './postRoutes';
import topicRoutes from './topicRoutes';

const routes = Router();

routes.use('/api/admin', adminRoutes);
routes.use('/api/board', boardRoutes);
routes.use('/api/user', userRoutes);
routes.use('/api/post', postRoutes);
routes.use('/api/topic', topicRoutes);

export default routes;
