import { Router } from 'express';

import * as topicController from '../controller/topicController';

const router = Router();

router.delete('/:id', topicController.deleteOne);
router.get('/', topicController.getAll);
router.post('/', topicController.saveOne);

export default router;
