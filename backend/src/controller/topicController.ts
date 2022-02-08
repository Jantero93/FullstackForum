/** Services */
import * as TopicService from '../services/topicService';

/** Types */
import { Response, Request } from 'express';

import logger from '../utils/logger';

export const deleteOne = async (req: Request, res: Response) => {
  logger.printStack('Topic Controller', deleteOne.name);
  if (await TopicService.deleteOne(req.params.id, req.userId, req.admin)) {
    res.sendStatus(202);
  } else {
    //! IMPROVE ERROR HANDLING!
    res.sendStatus(401);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  logger.printStack('Topic Controller', getAll.name);
  res.send(await TopicService.findAll());
};

export const saveOne = async (req: Request, res: Response) => {
  logger.printStack('Topic Controller', saveOne.name);
  const { topicName, boardName } = req.body;
  const userId: string = req.userId;
  res.send(await TopicService.saveOne(topicName, boardName, userId));
};

export const getAllByBoardName = async (req: Request, res: Response) => {
  logger.printStack('Topic Controller', getAllByBoardName.name);
  res.send(await TopicService.findAllByBoardName(req.params.boardName));
};
