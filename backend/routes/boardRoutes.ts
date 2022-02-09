import { Router } from 'express';

import * as BoardController from '../controller/boardController';
import { authorization, isUUIDValid } from '../utils/middleware';

const router = Router();

router.delete('/:id', isUUIDValid, authorization, BoardController.deleteBoard);
router.get('/', BoardController.getAll);
router.post('/', authorization, BoardController.postBoard);

export default router;
