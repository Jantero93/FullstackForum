/** Repository */
import { getCustomRepository } from 'typeorm';
import { TopicRepository } from '../repositories/topicRepository';

/** Entities */
import { Topic } from '../entity/Topic';

/** Services */
import * as BoardService from '../services/boardService';
import * as UserService from '../services/userService';

/** Utils */
import moment from 'moment';
import logger from '../utils/logger';
import ResponseError from '../utils/ApplicationError';
import { validate } from 'class-validator';

/**
 * Throw error if not authorized to delete
 * Remove topic from DB
 * @param topicId id of topic to remove
 */
export const deleteOne = async (
  topicId: string,
  userId: string,
  admin?: boolean
): Promise<void> => {
  logger.printStack('Topic Service', deleteOne.name);

  const topicRepository = getCustomRepository(TopicRepository);
  const topic = await topicRepository.findTopicWithUserByTopicId(topicId);

  if (topic.user.id !== userId || !admin)
    throw new ResponseError('Forbidden', 'FORBIDDEN');

  await topicRepository.delete(topicId);
};

/**
 * Finds all topics
 * @returns Array of topics
 */
export const findAll = async (): Promise<Topic[]> => {
  logger.printStack('Topic Service', findAll.name);
  const topicRepository = getCustomRepository(TopicRepository);
  return await topicRepository.find();
};

/**
 * Throws error if not topics not found by board name
 * Finds topics of given board name
 * @param boardName Name of board
 * @returns Array of topics
 */
export const findAllByBoardName = async (
  boardName: string
): Promise<Topic[]> => {
  logger.printStack('Topic Service', findAllByBoardName.name);
  return await BoardService.findTopicsByBoardName(boardName);
};

/**
 * Throws error if entity not found
 * @param topicId id of topic
 * @returns Topic of given id
 */
export const findOne = async (topicId: string): Promise<Topic> => {
  logger.printStack('Topic Service', findOne.name);
  const topicRepository = getCustomRepository(TopicRepository);

  const topic = await topicRepository.findOne(topicId);

  if (!topic) throw new ResponseError('No topic found', 'ENTITY_NOT_FOUND');
  else return topic;
};

/**
 * Throws error if posts not found by given topic
 * Find posts and theirs users related to topic
 * @param topicId id of topic
 * @returns Posts of given id topic
 */
export const findPostsByTopicId = async (topicId: string): Promise<Topic> => {
  logger.printStack('Topic Service', findPostsByTopicId.name);
  const topicRepository = getCustomRepository(TopicRepository);
  const topics = await topicRepository.findOne(topicId, {
    relations: ['user', 'posts', 'posts.user']
  });

  if (!topics?.posts)
    throw new ResponseError('No posts found by given id', 'ENTITY_NOT_FOUND');

  topics.posts.sort(
    (a, b) => moment(a.created).unix() - moment(b.created).unix()
  );

  return topics;
};

/**
 * Throws error if save fails
 * Saves Topic to DB
 * @param topicName Name of topic
 * @param boardName Name of parent board
 * @returns saved Topic Entity
 */
export const saveOne = async (
  topicName: string,
  boardName: string,
  userId: string
): Promise<Topic> => {
  logger.printStack('Topic Service', saveOne.name);
  const topicRepository = getCustomRepository(TopicRepository);

  const parentBoard = await BoardService.findBoardByBoardName(boardName);
  const postedUser = await UserService.findOne(userId);

  const topic = new Topic();
  topic.board = parentBoard;
  topic.topicName = topicName;
  topic.user = postedUser;

  const errors = await validate(topic);

  if (errors.length)
    throw new ResponseError(
      'Topic does not meet requirements',
      'INVALID_REQUEST_BODY'
    );
  else return await topicRepository.save(topic);
};
