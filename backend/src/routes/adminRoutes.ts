import { Router } from 'express';

/** Services */
import * as AdminController from '../controller/adminController';

/** Middleware */
import { authorization } from '../utils/middleware';

const router = Router();

router.post('/', authorization, AdminController.adminLogin);

export default router;
