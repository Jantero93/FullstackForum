/** TypeORM */
import { EntityRepository, Repository } from 'typeorm';

/** Entity */
import { User } from '../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * ! No error handling
   * @param param_username Username to search with
   * @returns User entity
   */
  async findUserByUsername(param_username: string): Promise<User> {
    return (await this.createQueryBuilder('user')
      .where('user.username = :username', { username: param_username })
      .addSelect('user.passwordHash')
      .getOne()) as User;
  }
}
