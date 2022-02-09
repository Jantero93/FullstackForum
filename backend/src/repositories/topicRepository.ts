/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { Topic } from '../entity/Topic';
import ResponseError from '../utils/ApplicationError';

import logger from '../utils/logger';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  /**
   * Throws error if entity not found
   * @param topicId
   * @returns Topic Entity
   */
  async findTopicWithUserByTopicId(topicId: string): Promise<Topic> {
    logger.printStack('Topic Repository', 'findTopicWithUserByTopicId');

    const response = await this.createQueryBuilder('topic')
      .where('topic.id = :id', { id: topicId })
      .leftJoinAndSelect('topic.user', 'user')
      .getOne();

    if (!response)
      throw new ResponseError('Topic not found', 'ENTITY_NOT_FOUND');
    else return response;
  }
}
