import { Router } from 'express';

import * as UserController from '../controller/userController';
import { authorization } from '../utils/middleware';

const router = Router();

router.delete('/:id', authorization, UserController.deleteUser);
router.get('/', authorization, UserController.getAllUsers);
router.post('/', UserController.saveOne);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

export default router;
