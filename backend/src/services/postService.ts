/** Repository */
import { getCustomRepository } from 'typeorm';
import { PostRepository } from '../repositories/postRepository';

/** Entities */
import { Post } from '../entity/Post';

/** Services */
import * as TopicService from '../services/topicService';

export const getAllByTopicId = async (topicId: string): Promise<Post[]> =>
  await TopicService.findPostsByTopicId(topicId);

export const saveOne = async (
  message: string,
  topicId: string
): Promise<Post> => {
  const postRepository = getCustomRepository(PostRepository);

  console.log('sda');

  const parentTopic = await TopicService.findOne(topicId);

  const post = new Post();
  post.message = message;
  post.votes = 0;
  post.topic = parentTopic;

  return await postRepository.save(post);
};
