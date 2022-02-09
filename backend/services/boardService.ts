/** Repository */
import { BoardRepository } from '../repositories/boardRepository';
import { getCustomRepository } from 'typeorm';

/** Entity */
import { Board } from '../entity/Board';

import ResponseError from '../utils/ApplicationError';

import logger from '../utils/logger';
import { validate } from 'class-validator';

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
 * Throws error if not found
 * Find Board entity by name of Board
 * @param boardName Name of the board
 * @returns Board Entity
 */
export const findBoardByBoardName = async (
  boardName: string
): Promise<Board> => {
  logger.printStack('Board Service', findBoardByBoardName.name);
  const boardRepository = getCustomRepository(BoardRepository);
  return await boardRepository.findBoardByBoardName(boardName);
};

/**
 * Throws error if not found
 * Get all topics from DB by specific board name
 * @param boardName Name of the board
 * @returns Array of topics based on board name
 */
export const findTopicsByBoardName = async (boardName: string) => {
  logger.printStack('Board Service', findTopicsByBoardName.name);
  const boardRepository = getCustomRepository(BoardRepository);
  return await boardRepository.findTopicsByBoardName(boardName);
};

/**
 * Throws error if not found
 * Save new board
 * @param newBoard
 * @returns created Board Entity
 */
export const saveOne = async (paramBoard: string, paramAdjective: string) => {
  logger.printStack('Board Service', saveOne.name);
  const boardRepository = getCustomRepository(BoardRepository);

  const boardFromDB = await boardRepository.findOne({
    where: { board: paramBoard }
  });

  if (boardFromDB) {
    throw new ResponseError('Board exists already', 'ENTITY_EXISTS_ALREADY');
  }

  const board = new Board();
  board.board = paramBoard;
  board.adjective = paramAdjective;

  const errors = await validate(board);

  if (errors.length)
    throw new ResponseError(
      'Request body does not meet requirements',
      'INVALID_REQUEST_BODY'
    );
  else return await boardRepository.save(board);
};
