import { Request, Response, Router } from 'express';

import config from '../utils/config';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  config.ADMIN_PANEL_PASSWORD === req.body.password
    ? res.status(200).send('access granted')
    : res.status(403).send('NO ACCESS');
});

export default router;
