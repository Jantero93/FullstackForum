/** Services */
import * as BoardService from '../services/boardService';

/** Types */
import { Response, Request, NextFunction } from 'express';

import ResponseError from '../utils/ApplicationError';

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(await BoardService.findAllBoards());
  } catch (error) {
    next(
      new ResponseError(`Could not fetch boards`, 500, 'INTERNAL_SERVER_ERROR')
    );
  }
};
