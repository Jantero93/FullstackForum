import { Router } from 'express';

import * as UserController from '../controller/userController';

const router = Router();

router.get('/all', UserController.getAll);
router.post('/', UserController.saveOne);

export default router;
