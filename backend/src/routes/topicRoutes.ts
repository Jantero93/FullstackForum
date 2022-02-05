import { Router } from 'express';
import { authorization } from '../utils/middleware';

import * as topicController from '../controller/topicController';

const router = Router();

router.delete('/:id', authorization, topicController.deleteOne);
router.get('/', topicController.getAll);
router.get('/:boardName', topicController.getAllByBoardName);
router.post('/', authorization, topicController.saveOne);

export default router;
