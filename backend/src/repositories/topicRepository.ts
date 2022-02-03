/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { Board } from '../entity/Board';
import { Post } from '../entity/Post';
import { Topic } from '../entity/Topic';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  async findTopicsByBoard(board: Board): Promise<Topic[]> {
    return await this.find({ where: { board: board } });
  }

  async findPostsByTopicId(topicId: string): Promise<Post[]> {
    return await this.createQueryBuilder('topic')
      .where('topic.id = :id', { id: topicId })
      .leftJoinAndSelect('topic.posts', 'post')
      .getOne()
      .then((topic) => topic!.posts);
  }
}
