/** Types */
import { Response, Request, NextFunction } from 'express';

/** Services */
import * as PostService from '../services/postService';
import { findPostsByTopicId } from '../services/topicService';

import ResponseError from '../utils/ApplicationError';
import logger from '../utils/logger';

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Post Controller', deletePost.name);
  try {
    res
      .status(202)
      .send(await PostService.removePost(req.params.id, req.userId));
  } catch (error) {
    next(new ResponseError('Forbidden', 403, 'FORBIDDEN'));
  }
};

export const findAllByTopicId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.printStack('Post Controller', findAllByTopicId.name);

  try {
    res.send(await findPostsByTopicId(req.params.id));
  } catch (error) {
    next(new ResponseError('Topic not found by id', 404, 'ENTITY_NOT_FOUND'));
  }
};

export const saveOne = async (req: Request, res: Response) => {
  logger.printStack('Post Controller', saveOne.name);

  const { message, topicId } = req.body;
  const userId: string = req.userId;

  res.send(await PostService.saveOne(message, topicId, userId));
};
