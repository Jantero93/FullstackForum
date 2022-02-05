/** Types */
import { Response, Request, NextFunction } from 'express';

/** Services */
import * as PostService from '../services/postService';

export const findAllByTopicId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(await PostService.getAllByTopicId(req.params.topicId));
  } catch (error) {
    next(error);
  }
};

export const saveOne = async (req: Request, res: Response) => {
  const { message, topicId } = req.body;
  const userId: string = req.userId;

  res.send(await PostService.saveOne(message, topicId, userId));
};
