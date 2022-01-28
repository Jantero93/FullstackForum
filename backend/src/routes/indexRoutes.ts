import { Router } from 'express';
import user from './userRoutes';

const routes = Router();

routes.use('/api/user', user);

export default routes;
