import { Router } from 'express';

import * as PostController from '../controller/postController';

const router = Router();

router.get('/:topicId', PostController.findAllByTopicId);
router.post('/', PostController.saveOne);

export default router;
