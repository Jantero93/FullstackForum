import { Router } from 'express';

/** Services */
import * as AdminController from '../controller/adminController';

/** Middleware */

const router = Router();

router.post('/', AdminController.adminLogin);

export default router;
