/** Types */
import { Response, Request } from 'express';

/** Services */
import * as PostService from '../services/postService';
import * as TopicService from '../services/topicService';

export const findAllByTopicId = async (req: Request, res: Response) =>
  res.send(await TopicService.findPostsByTopicId(req.params.topicId));

export const saveOne = async (req: Request, res: Response) => {
  const { message, topicId } = req.body;
  res.send(await PostService.saveOne(message, topicId));
};
