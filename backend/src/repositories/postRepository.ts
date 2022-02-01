import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entity/Post';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async findPostsByTopicId(topicId: string) {
    return await this.createQueryBuilder('topic')
      .where('topic.id = :id', { id: topicId })
      .leftJoinAndSelect('topic.posts', 'post')
      .getMany();
  }
}
