/** Services */
import * as TopicService from '../services/topicService';

/** Types */
import { Response, Request } from 'express';

export const deleteOne = async (req: Request, res: Response) =>
  res.send(await TopicService.deleteOne(req.params.id));

export const getAll = async (_req: Request, res: Response) =>
  res.send(await TopicService.findAll());

export const saveOne = async (req: Request, res: Response) => {
  const { topicName, boardName } = req.body;
  const userId: string = req.userId;
  res.send(await TopicService.saveOne(topicName, boardName, userId));
};

export const getAllByBoardName = async (req: Request, res: Response) =>
  res.send(await TopicService.findAllByBoardName(req.params.boardName));
