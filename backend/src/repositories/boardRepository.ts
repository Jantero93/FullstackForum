/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { Board } from '../entity/Board';
import { Topic } from '../entity/Topic';
import ResponseError from '../utils/ApplicationError';

import logger from '../utils/logger';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  /**
   * ! No error handling
   * @param param_boardName Name of board
   * @returns Board Entity
   */
  async findBoardByBoardName(param_boardName: string): Promise<Board> {
    logger.printStack('Board Repository', 'findBoardByBoardName');

    const response = await this.findOne({ where: { board: param_boardName } });

    if (!response)
      throw new ResponseError('Board not found', 404, 'ENTITY_NOT_FOUND');

    return response;
  }

  /**
   * ! No error handling
   * @param param_boardName Name of board
   * @returns Topic entities related to board
   */
  async findTopicsByBoardName(param_boardName: string): Promise<Topic[]> {
    logger.printStack('Board Repository', 'findTopicsByBoardName');

    const response = await this.createQueryBuilder('board')
      .where('board.board = :board', { board: param_boardName })
      .leftJoinAndSelect('board.topics', 'topic')
      .leftJoinAndSelect('topic.user', 'user')
      .getOne();

    if (!response?.topics)
      throw new ResponseError(
        'No topics found on this board',
        404,
        'NOT_FOUND'
      );

    return response.topics;
  }
}
