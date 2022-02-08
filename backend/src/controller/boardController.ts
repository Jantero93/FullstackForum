/** Services */
import * as BoardService from '../services/boardService';

/** Types */
import { Response, Request, NextFunction } from 'express';

/** Utils */
import ResponseError from '../utils/ApplicationError';
import logger from '../utils/logger';

export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Board Controller', deleteBoard.name);
  try {
    res
      .status(202)
      .send(BoardService.deleteBoardById(req.params.id, req.admin));
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Board Controller', getAll.name);
  try {
    res.send(await BoardService.findAllBoards());
  } catch (error) {
    next(
      new ResponseError(`Could not fetch boards`, 500, 'INTERNAL_SERVER_ERROR')
    );
  }
};

export const postBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Board Controller', postBoard.name);
  try {
    req.admin
      ? res.status(200).send(await BoardService.saveOne(req.body))
      : res.sendStatus(401);
  } catch (error) {
    next(error);
  }
};
