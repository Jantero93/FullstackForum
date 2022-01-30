import { EntityRepository, Repository } from 'typeorm';
import { Topic } from '../entity/Topic';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  async findTopicsByBoardName(param_boardRef: string) {
    return await this.find({ where: { boardRef: param_boardRef } });
  }
}
