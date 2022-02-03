/** Repository */
import { getCustomRepository } from 'typeorm';
import { PostRepository } from '../repositories/postRepository';

/** Entities */
import { Post } from '../entity/Post';

/** Services */
import * as TopicService from '../services/topicService';

/**
 * ! No error handling
 * Get all posts related to topic id
 * @param topicId id of Topic
 * @returns Posts related to topic id
 */
export const getAllByTopicId = async (topicId: string): Promise<Post[]> =>
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
  topicId: string
): Promise<Post> => {
  const postRepository = getCustomRepository(PostRepository);

  const parentTopic = await TopicService.findOne(topicId);

  const post = new Post();
  post.message = message;
  post.votes = 0;
  post.topic = parentTopic;

  return await postRepository.save(post);
};
