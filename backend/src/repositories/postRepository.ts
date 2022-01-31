import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entity/Post';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async findPostsByTopicId(param_topicId: string) {
    console.log(
      'test repository',
      await this.find({ where: { topicRef: param_topicId } })
    );
    return await this.find({ where: { topicRef: param_topicId } });
  }
}
