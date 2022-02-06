import { Request, Response, Router } from 'express';

import config from '../config/config';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  config.ADMIN_PANEL_PASSWORD === req.body.password
    ? res.status(200).send({ message: 'Access granted' })
    : res.status(403).send({ error: 'Not authorized!' });
});

export default router;
