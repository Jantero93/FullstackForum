/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { Post } from '../entity/Post';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async findPostsByTopicId(topicId: string): Promise<Post[]> {
    return await this.createQueryBuilder('topic')
      .where('topic.id = :id', { id: topicId })
      .leftJoinAndSelect('topic.posts', 'post')
      .getMany();
  }
}
