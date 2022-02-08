/** Repository */
import { getCustomRepository } from 'typeorm';
import { PostRepository } from '../repositories/postRepository';

/** Entities */
import { Post } from '../entity/Post';

/** Services */
import * as TopicService from '../services/topicService';
import * as UserService from '../services/userService';

import ResponseError from '../utils/ApplicationError';
import logger from '../utils/logger';

export const removePost = async (
  postId: string,
  userId: string,
  admin?: boolean
): Promise<Post> => {
  logger.printStack('Post Service', removePost.name);
  const postRepository = getCustomRepository(PostRepository);

  const post = (await postRepository.findOne(postId, {
    relations: ['user']
  })) as Post;

  if (userId !== post.user.id && !admin)
    throw new ResponseError('Forbidden', 403, 'FORBIDDEN');

  post.message = '(removed)';

  return await postRepository.save(post);
};

/**
 * ! No error handling
 * Save post on specific topic
 * @param message Post message
 * @param topicId id of topic
 * @returns Saved Post Entity
 */
export const saveOne = async (
  message: string,
  topicId: string,
  userId: string
): Promise<Post> => {
  logger.printStack('Post Service', saveOne.name);
  const postRepository = getCustomRepository(PostRepository);

  const parentTopic = await TopicService.findOne(topicId);
  const postedUser = await UserService.findOne(userId);

  const post = new Post();
  post.message = message;
  post.topic = parentTopic;
  post.user = postedUser;

  return await postRepository.save(post);
};
