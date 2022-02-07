import { Router } from 'express';

import * as AdminController from '../controller/adminController';

const router = Router();

router.post('/', AdminController.adminLogin);

export default router;
