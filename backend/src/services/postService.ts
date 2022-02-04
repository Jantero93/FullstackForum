/** Repository */
import { getCustomRepository } from 'typeorm';
import { PostRepository } from '../repositories/postRepository';

/** Entities */
import { Post } from '../entity/Post';

/** Services */
import * as TopicService from '../services/topicService';
import * as UserService from '../services/userService';
import { Topic } from '../entity/Topic';

/**
 * ! No error handling
 * Get all posts and users related to topic id
 * @param topicId id of Topic
 * @returns Posts related to topic id
 */
export const getAllByTopicId = async (topicId: string): Promise<Topic[]> =>
  await TopicService.findPostsByTopicId(topicId);

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
  const postRepository = getCustomRepository(PostRepository);

  const parentTopic = await TopicService.findOne(topicId);

  const postedUser = await UserService.findOne(userId);

  const post = new Post();
  post.message = message;
  post.topic = parentTopic;
  post.user = postedUser;

  return await postRepository.save(post);
};
