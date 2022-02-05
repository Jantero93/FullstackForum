import { Router } from 'express';

import { authorization } from '../utils/middleware';

import * as PostController from '../controller/postController';

const router = Router();

router.get('/:topicId', PostController.findAllByTopicId);
router.post('/', authorization, PostController.saveOne);

export default router;
