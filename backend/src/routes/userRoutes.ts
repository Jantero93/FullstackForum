import { Router } from 'express';

import * as UserController from '../controller/UserController';

const router = Router();

router.post('/', UserController.saveOne);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

export default router;
