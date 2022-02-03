/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { User } from '../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
