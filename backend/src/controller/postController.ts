/** Types */
import { Response, Request, NextFunction } from 'express';

/** Services */
import * as PostService from '../services/postService';
import ResponseError from '../utils/ApplicationError';

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(202).send(await PostService.removePost(req.params.id));
  } catch (error) {
    next(
      new ResponseError('Failed to delete post', 404, 'FAILED_DELETE_ENTITY')
    );
  }
};

export const findAllByTopicId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(await PostService.getAllByTopicId(req.params.id));
  } catch (error) {
    next(new ResponseError('Topic not found by id', 404, 'ENTITY_NOT_FOUND'));
  }
};

export const saveOne = async (req: Request, res: Response) => {
  const { message, topicId } = req.body;
  const userId: string = req.userId;

  res.send(await PostService.saveOne(message, topicId, userId));
};
