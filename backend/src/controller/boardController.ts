/** Repository */
import { getCustomRepository } from 'typeorm';
import { BoardRepository } from '../repositories/boardRepository';

/** Types */
import { Response, Request } from 'express';

export const getAll = async (_req: Request, res: Response) => {
  const boardRepository = getCustomRepository(BoardRepository);
  res.send(await boardRepository.find());
};
