/** Repository */
import { BoardRepository } from '../repositories/boardRepository';
import { getCustomRepository } from 'typeorm';

/** Entity */
import { Board } from '../entity/Board';

import logger from '../utils/logger';
import ResponseError from '../utils/ApplicationError';

export const deleteBoardById = async (id: string): Promise<void> => {
  logger.printStack('Board Service', deleteBoardById.name);
  const boardRepository = getCustomRepository(BoardRepository);
  return (await boardRepository.delete(id)) as unknown as void;
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

export const saveOne = async (newBoard: Board) => {
  logger.printStack('Board Service', saveOne.name);
  const boardRepository = getCustomRepository(BoardRepository);

  const boardFromDB = await boardRepository.find({
    where: { board: newBoard.board }
  });

  if (boardFromDB) {
    throw new ResponseError(
      'Board exists already',
      409,
      'ENTITY_EXISTS_ALREADY'
    );
  }

  return await boardRepository.save(newBoard);
};
