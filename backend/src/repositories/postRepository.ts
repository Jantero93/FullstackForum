/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { Post } from '../entity/Post';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
