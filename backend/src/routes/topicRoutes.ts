import { Router } from 'express';

import * as topicController from '../controller/topicController';

/** Utils */
import { authorization, isUUIDValid } from '../utils/middleware';

const router = Router();

router.delete('/:id', isUUIDValid, authorization, topicController.deleteOne);
router.get('/', topicController.getAll);
router.get('/:boardName', topicController.getAllByBoardName);
router.post('/', authorization, topicController.saveOne);

export default router;
