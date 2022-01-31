import { Router } from 'express';

import * as PostController from '../controller/postController';

const router = Router();

router.get('/:topicId', PostController.getAllByTopicId);
router.post('/', PostController.postNewPost);

export default router;
