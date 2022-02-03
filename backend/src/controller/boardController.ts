/** Services */
import * as BoardService from '../services/boardService';

/** Types */
import { Response, Request } from 'express';

export const getAll = async (_req: Request, res: Response) => {
  res.send(await BoardService.findAllBoards());
};
