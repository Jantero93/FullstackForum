import { Router } from 'express';

import * as BoardController from '../controller/boardController';
import { authorization } from '../utils/middleware';

const router = Router();

router.delete('/:boardId', authorization, BoardController.deleteBoard);
router.get('/', BoardController.getAll);

export default router;
