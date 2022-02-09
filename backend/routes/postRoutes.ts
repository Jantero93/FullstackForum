import { Router } from 'express';

import { authorization, isUUIDValid } from '../utils/middleware';

import * as PostController from '../controller/postController';

const router = Router();

router.delete('/:id', isUUIDValid, authorization, PostController.deletePost);
router.get('/:id', isUUIDValid, PostController.findAllByTopicId);
router.post('/', authorization, PostController.saveOne);

export default router;
