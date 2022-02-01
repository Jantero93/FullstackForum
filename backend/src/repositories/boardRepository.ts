import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entity/Board';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async findBoardByBoardName(param_boardName: string) {
    return await this.findOne({ where: { board: param_boardName } });
  }

  async findBoardWithTopics(param_boardName: string) {
    return await this.createQueryBuilder('board')
      .where('board.board = :board', { board: param_boardName })
      .leftJoinAndSelect('board.topics', 'topic')
      .getOne();
  }
}
