/** Repository */
import { BoardRepository } from '../repositories/boardRepository';
import { getCustomRepository } from 'typeorm';

/** Entity */
import { Board } from '../entity/Board';

export const findAllBoards = async (): Promise<Board[]> =>
  await getCustomRepository(BoardRepository).find();

export const findBoardByBoardName = async (
  boardName: string
): Promise<Board> => {
  const boardRepository = getCustomRepository(BoardRepository);
  return (await boardRepository.findBoardByBoardName(boardName)) as Board;
};

export const findTopicsByBoardName = async (boardName: string) => {
  const boardRepository = getCustomRepository(BoardRepository);
  return await boardRepository.findTopicsByBoardName(boardName);
};
