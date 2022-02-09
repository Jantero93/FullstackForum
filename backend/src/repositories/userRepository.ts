/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { User } from '../entity/User';
import ResponseError from '../utils/ApplicationError';

import logger from '../utils/logger';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Throws error if no user found
   * @param param_username username
   * @returns User Entity
   */
  async findUserByUsername(param_username: string): Promise<User> {
    logger.printStack('User Repository', 'findUserByUsername');

    const user = await this.createQueryBuilder('user')
      .where('user.username = :username', { username: param_username })
      .addSelect('user.passwordHash')
      .getOne();

    if (!user) throw new ResponseError('User not found', 'ENTITY_NOT_FOUND');
    else return user;
  }
}
