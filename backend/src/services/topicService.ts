/** Repository */
import { getCustomRepository } from 'typeorm';
import { TopicRepository } from '../repositories/topicRepository';

/** Entities */
import { Post } from '../entity/Post';
import { Topic } from '../entity/Topic';

/** Services */
import * as BoardService from '../services/boardService';

/**
 * Remove topic from DB
 * @param topicId id of topic to remove
 */
export const deleteOne = async (topicId: string): Promise<void> => {
  const topicRepository = getCustomRepository(TopicRepository);
  await topicRepository.delete(topicId);
};

/**
 * Finds all topics
 * @returns Array of topics
 */
export const findAll = async (): Promise<Topic[]> => {
  const topicRepository = getCustomRepository(TopicRepository);
  return await topicRepository.find();
};

/**
 * ! No error handling
 * Finds topics of given board name
 * @param boardName Name of board
 * @returns Array of topics
 */
export const findAllByBoardName = async (boardName: string): Promise<Topic[]> =>
  await BoardService.findTopicsByBoardName(boardName);

/**
 * ! No error handling
 * Finds topic by its ID
 * @param topicId id of topic
 * @returns Topic of given id
 */
export const findOne = async (topicId: string): Promise<Topic> => {
  const topicRepository = getCustomRepository(TopicRepository);
  return (await topicRepository.findOne(topicId)) as Topic;
};

/**
 * ! No error handling
 * Find posts related to topic
 * @param topicId id of topic
 * @returns Posts of given id topic
 */
export const findPostsByTopicId = async (topicId: string): Promise<Post[]> => {
  const topicRepository = getCustomRepository(TopicRepository);
  return await topicRepository.findPostsByTopicId(topicId);
};

/**
 * ! No error handling
 * Saves Topic to DB
 * @param topicName Name of topic
 * @param boardName Name of parent board
 * @returns saved Topic Entity
 */
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
