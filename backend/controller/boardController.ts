/** Services */
import * as BoardService from '../services/boardService';

/** Types */
import { Response, Request, NextFunction } from 'express';

/** Utils */
import logger from '../utils/logger';
import ResponseError from '../utils/ApplicationError';

export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Board Controller', deleteBoard.name);

  if (!req.admin)
    throw new ResponseError('Login again', 'AUTHORIZATION_FAILED');

  try {
    res.status(202).send(BoardService.deleteBoardById(req.params.id));
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
    res.status(200).send(await BoardService.findAllBoards());
  } catch (error) {
    next(error);
  }
};

export const postBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Board Controller', postBoard.name);
  try {
    const { board, adjective } = req.body;

    // Throw error if not admin
    req.admin
      ? res.status(200).send(await BoardService.saveOne(board, adjective))
      : res.sendStatus(403);
  } catch (error) {
    next(error);
  }
};
