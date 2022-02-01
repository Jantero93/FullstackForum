/** Repository */
import { getCustomRepository } from 'typeorm';
import { BoardRepository } from '../repositories/boardRepository';

/** Types */
import { Response, Request } from 'express';
import { Board } from '../entity/Board';

export const getAll = async (_req: Request, res: Response) => {
  const boardRepository = getCustomRepository(BoardRepository);
  res.send(await boardRepository.find());
};

/!* Testing purpose */;
export const testAll = async (_req: Request, res: Response) => {
  const boardRepository = getCustomRepository(BoardRepository);

  const boardWithTopics = (await boardRepository.findBoardWithTopics(
    'test'
  )) as Board;

  const test = await boardRepository
    .createQueryBuilder('board')
    .leftJoinAndSelect('board.topics', 'topic')
    .where('board.board = :board', { board: 'test' })
    .getMany();

  console.log('test', test);

  res.send(boardWithTopics.topics);
};
