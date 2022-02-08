/** Repository */
import { BoardRepository } from '../repositories/boardRepository';
import { getCustomRepository } from 'typeorm';

/** Entity */
import { Board } from '../entity/Board';

import logger from '../utils/logger';

export const deleteBoardById = async (
  id: string,
  admin: boolean
): Promise<boolean> => {
  logger.printStack('Board Service', deleteBoardById.name);
  if (admin)
    return (await getCustomRepository(BoardRepository).delete(
      id
    )) as unknown as true;
  else return false;
};

/**
 * Get all boards from DB
 * @returns All boards as array
 */
export const findAllBoards = async (): Promise<Board[]> => {
  logger.printStack('Board Service', findAllBoards.name);
  return await getCustomRepository(BoardRepository).find();
};

/**
 * ! No error handling
 * Find Board entity by name of Board
 * @param boardName Name of the board
 * @returns Board Entity
 */
export const findBoardByBoardName = async (
  boardName: string
): Promise<Board> => {
  logger.printStack('Board Service', findBoardByBoardName.name);
  const boardRepository = getCustomRepository(BoardRepository);
  return (await boardRepository.findBoardByBoardName(boardName)) as Board;
};

/**
 * ! No error handling
 * Get all topics from DB by specific board name
 * @param boardName Name of the board
 * @returns Array of topics based on board name
 */
export const findTopicsByBoardName = async (boardName: string) => {
  logger.printStack('Board Service', findTopicsByBoardName.name);
  const boardRepository = getCustomRepository(BoardRepository);
  return await boardRepository.findTopicsByBoardName(boardName);
};
