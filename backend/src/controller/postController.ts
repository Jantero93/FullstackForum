/** Repository */
import { getCustomRepository } from 'typeorm';
import { PostRepository } from '../repositories/postRepository';
import { TopicRepository } from '../repositories/topicRepository';

/** Types */
import { Response, Request } from 'express';
import { Topic } from '../entity/Topic';
import { Post } from '../entity/Post';

export const getAllByTopicId = async (req: Request, res: Response) => {
  const topicRepository = getCustomRepository(TopicRepository);

  const topic = (await topicRepository.findTopicWithPosts(
    req.params.topicId
  )) as Topic;
  res.send(topic.posts);
};

export const postNewPost = async (req: Request, res: Response) => {
  const postRepository = getCustomRepository(PostRepository);
  const topicRepository = getCustomRepository(TopicRepository);

  const { message, topicRef } = req.body;

  const parentTopic = (await topicRepository.findOne(topicRef)) as Topic;

  const post = new Post();
  post.message = message;
  post.votes = 0;
  post.topic = parentTopic;

  res.send(await postRepository.save(post));
};
