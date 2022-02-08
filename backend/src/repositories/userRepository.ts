/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { User } from '../entity/User';

import logger from '../utils/logger';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByUsername(param_username: string): Promise<User> {
    logger.printStack('User Repository', 'findUserByUsername');

    return (await this.createQueryBuilder('user')
      .where('user.username = :username', { username: param_username })
      .addSelect('user.passwordHash')
      .getOne()) as User;
  }
}
