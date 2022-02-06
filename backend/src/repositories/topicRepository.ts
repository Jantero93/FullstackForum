/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { Topic } from '../entity/Topic';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  async findTopicWithUserByTopicId(topicId: string): Promise<Topic> {
    return (await this.createQueryBuilder('topic')
      .where('topic.id = :id', { id: topicId })
      .leftJoinAndSelect('topic.user', 'user')
      .getOne()) as Topic;
  }
}
