import { Router } from 'express';

import * as UserController from '../controller/userController';

const router = Router();

router.post('/', UserController.saveOne);
router.post('/login', UserController.login);

export default router;
