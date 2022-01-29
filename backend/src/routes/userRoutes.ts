import { Router } from 'express';

import * as UserController from '../controller/userController';

const router = Router();

router.delete('/:id', UserController.deleteOne);
router.get('/', UserController.getAll);
router.post('/', UserController.saveOne);
router.put('/:id', UserController.replace);

export default router;
