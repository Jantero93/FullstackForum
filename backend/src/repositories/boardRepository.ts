/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { Board } from '../entity/Board';
import { Topic } from '../entity/Topic';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  /**
   * ! No error handling
   * @param param_boardName Name of board
   * @returns Board Entity
   */
  async findBoardByBoardName(param_boardName: string): Promise<Board> {
    return (await this.findOne({ where: { board: param_boardName } })) as Board;
  }

  /**
   * ! No error handling
   * @param param_boardName Name of board
   * @returns Topic entities related to board
   */
  async findTopicsByBoardName(param_boardName: string): Promise<Topic[]> {
    return await this.createQueryBuilder('board')
      .where('board.board = :board', { board: param_boardName })
      .leftJoinAndSelect('board.topics', 'topic')
      .leftJoinAndSelect('topic.user', 'user')
      .getOne()
      .then((board) => board!.topics);
  }
}
