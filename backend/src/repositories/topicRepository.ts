import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entity/Board';
import { Topic } from '../entity/Topic';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  async findTopicsByBoard(board: Board) {
    return await this.find({ where: { board: board } });
  }

  async findTopicWithPosts(topicId: string) {
    return await this.createQueryBuilder('topic')
      .where('topic.id = :id', { id: topicId })
      .leftJoinAndSelect('topic.posts', 'post')
      .getOne();
  }
}
