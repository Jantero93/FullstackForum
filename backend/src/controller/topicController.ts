/** Repository */
import { getCustomRepository } from 'typeorm';
import { TopicRepository } from '../repositories/topicRepository';
import { BoardRepository } from '../repositories/boardRepository';

/** Entities */
import { Board } from '../entity/Board';
import { Topic } from '../entity/Topic';

/** Types */
import { Response, Request } from 'express';

export const deleteOne = async (req: Request, res: Response) => {
  const topicRepository = getCustomRepository(TopicRepository);
  res.send(await topicRepository.delete(req.params.id));
};

export const getAll = async (_req: Request, res: Response) => {
  const topicRepository = getCustomRepository(TopicRepository);
  res.send(await topicRepository.find());
};

export const saveOne = async (req: Request, res: Response) => {
  const boardRepository = getCustomRepository(BoardRepository);
  const topicRepository = getCustomRepository(TopicRepository);

  const { topicName, boardRef } = req.body;

  const board = (await boardRepository.findBoardByBoardName(boardRef)) as Board;

  const newTopic = new Topic();
  newTopic.board = board;
  newTopic.posts = [];
  newTopic.topicName = topicName;

  res.send(await topicRepository.save(newTopic));
};

export const getAllByBoard = async (req: Request, res: Response) => {
  const boardRepository = getCustomRepository(BoardRepository);

  const board = (await boardRepository.findBoardWithTopics(
    req.params.board
  )) as Board;

  res.send(board.topics);
};
