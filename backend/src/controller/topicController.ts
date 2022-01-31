/** Repository */
import { getCustomRepository } from 'typeorm';
import { TopicRepository } from '../repositories/topicRepository';

/** Types */
import { Response, Request } from 'express';

/** Entities */
import { Topic } from '../entity/Topic';

export const deleteOne = async (req: Request, res: Response) => {
  const topicRepository = getCustomRepository(TopicRepository);
  res.send(await topicRepository.delete(req.params.id));
};

export const getAll = async (_req: Request, res: Response) => {
  const topicRepository = getCustomRepository(TopicRepository);
  res.send(await topicRepository.find());
};

export const saveOne = async (req: Request, res: Response) => {
  const topicRepository = getCustomRepository(TopicRepository);

  const { created, topic, board } = req.body;

  const newTopic = new Topic();

  //TODO: Validation

  newTopic.created = created;
  newTopic.topic = topic;
  newTopic.boardRef = board;

  res.send(await topicRepository.save(newTopic));
};

export const getAllByBoard = async (req: Request, res: Response) => {
  const topicRepository = getCustomRepository(TopicRepository);
  res.send(await topicRepository.findTopicsByBoardName(req.params.board));
};
