/** Repository */
import { UserRepository } from '../repositories/userRepository';
import { getCustomRepository } from 'typeorm';

/** Entity */
import { User } from '../entity/User';

/** Utils */
import bcrypt from 'bcryptjs';

export const saveUser = async (
  username: string,
  password: string
): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User();
  user.username = username;
  user.password = passwordHash;

  return await userRepository.save(user);
};
