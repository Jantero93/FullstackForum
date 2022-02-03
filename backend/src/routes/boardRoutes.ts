import { Router } from 'express';

import * as BoardController from '../controller/boardController';

const router = Router();

router.get('/', BoardController.getAll);

export default router;
