/** Repository */
import { getCustomRepository } from 'typeorm';
import { TopicRepository } from '../repositories/topicRepository';

/** Entities */
import { Post } from '../entity/Post';
import { Topic } from '../entity/Topic';

/** Services */
import * as BoardService from '../services/boardService';

export const deleteOne = async (topicId: string): Promise<void> => {
  const topicRepository = getCustomRepository(TopicRepository);
  await topicRepository.delete(topicId);
};

export const findAll = async (): Promise<Topic[]> => {
  const topicRepository = getCustomRepository(TopicRepository);
  return await topicRepository.find();
};

export const findOne = async (topicId: string): Promise<Topic> => {
  const topicRepository = getCustomRepository(TopicRepository);
  return (await topicRepository.findOne(topicId)) as Topic;
};

export const findPostsByTopicId = async (topicId: string): Promise<Post[]> => {
  const topicRepository = getCustomRepository(TopicRepository);
  return await topicRepository.findPostsByTopicId(topicId);
};

export const saveOne = async (
  topicName: string,
  boardName: string
): Promise<Topic> => {
  const topicRepository = getCustomRepository(TopicRepository);

  const fatherBoard = await BoardService.findBoardByBoardName(boardName);

  const topic = new Topic();
  topic.board = fatherBoard;
  topic.topicName = topicName;

  return await topicRepository.save(topic);
};
