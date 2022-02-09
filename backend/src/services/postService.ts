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
import { validate } from 'class-validator';

/**
 * Throw error if not authorized
 * @param postId Request id
 * @param userId Request id
 * @param admin Admin made request
 * @returns Modified post
 */
export const removePost = async (
  postId: string,
  userId: string,
  admin?: boolean
): Promise<Post> => {
  logger.printStack('Post Service', removePost.name);
  const postRepository = getCustomRepository(PostRepository);

  const post = await postRepository.findOne(postId, {
    relations: ['user']
  });

  if (!post?.user)
    throw new ResponseError('Post/User not found', 'ENTITY_NOT_FOUND');

  /** Request user id must meet DB ID or be admin */
  if (userId !== post.user.id && !admin)
    throw new ResponseError('Forbidden', 'FORBIDDEN');

  post.message = '(removed)';

  return await postRepository.save(post);
};

/**
 * Throw error if save fails
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

  const errors = await validate(post);

  if (errors.length)
    throw new ResponseError(
      'Post does not meet requirements',
      'INVALID_REQUEST_BODY'
    );
  else return await postRepository.save(post);
};
