/** Services */
import * as TopicService from '../services/topicService';

/** Types */
import { Response, Request, NextFunction } from 'express';

import logger from '../utils/logger';

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Topic Controller', deleteOne.name);

  try {
    const { userId, admin } = req;

    await TopicService.deleteOne(req.params.id, userId, admin);
    res.status(202).send('Deleted success');
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Topic Controller', getAll.name);

  try {
    res.send(await TopicService.findAll());
  } catch (error) {
    next(error);
  }
};

export const saveOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Topic Controller', saveOne.name);

  try {
    const { topicName, boardName } = req.body;

    res.send(await TopicService.saveOne(topicName, boardName, req.userId));
  } catch (error) {
    next(error);
  }
};

export const getAllByBoardName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Topic Controller', getAllByBoardName.name);

  try {
    res.send(await TopicService.findAllByBoardName(req.params.boardName));
  } catch (error) {
    next(error);
  }
};
