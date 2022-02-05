/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { Post } from '../entity/Post';
import { Topic } from '../entity/Topic';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  /**
   * Find by topic id posts and users
   * ! No error handling
   * @param topicId id of Topic
   * @returns Post entities related to topic
   */
  async findPostsAndUsersByTopicId(topicId: string): Promise<Topic> {
    return (await this.createQueryBuilder('topic')
      .where('topic.id = :id', { id: topicId })
      .leftJoinAndSelect('topic.posts', 'post')
      .leftJoinAndSelect('post.user', 'user')
      .getOne()) as Topic;
  }
}
